import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

export default class MonetizationCtrl {
  private static _instance: MonetizationCtrl;

  static get I() {
    if (!this._instance) this._instance = new MonetizationCtrl();

    return this._instance;
  }

  /**
   * Determine whether app knows if user has purchased upgrade.
   *
   * @return Promise<boolean>
   */
  async hasUpgraded(): Promise<boolean> {
    return JSON.parse(
      (await AsyncStorage.getItem(`hasUpgraded`)) as string
    ) as boolean;
  }

  /**
   * Restore upgrade purchase.
   *
   * @return true if successfully restored, false otherwise
   */
  async restoreUpgrade(): Promise<boolean> {
    // IAPs do not work in Expo Go :(
    if (Constants.appOwnership === "expo") return false;

    const InAppPurchases = await import("expo-in-app-purchases");

    try {
      await InAppPurchases.connectAsync();

      const { results } = await InAppPurchases.getPurchaseHistoryAsync();

      for (const result of results || []) {
        if (result.productId === "upgrade" && result.acknowledged) {
          await AsyncStorage.setItem(`hasUpgraded`, JSON.stringify(true));
          await InAppPurchases.disconnectAsync();
          return true;
        }
      }
      await InAppPurchases.disconnectAsync();
      return false;
    } catch (e) {
      await InAppPurchases.disconnectAsync();
      throw e;
    }
  }

  /**
   * Purchase given item.
   *
   * @param item ID of item to buy
   * @param consumable whether the item is consumable or not
   * @param onSuccess callback used when purchase is successful
   * @return true if successfully purchased, false otherwise
   */
  static async buy(
    item: string,
    consumable: boolean,
    onSuccess: () => Promise<void> | void
  ): Promise<boolean> {
    // IAPs do not work in Expo Go :(
    if (Constants.appOwnership === "expo") return false;

    const InAppPurchases = await import("expo-in-app-purchases"),
      { IAPResponseCode } = await import("expo-in-app-purchases");

    try {
      await InAppPurchases.connectAsync();

      await InAppPurchases.getProductsAsync([item]);

      InAppPurchases.purchaseItemAsync(item).then((_) => {});

      return await new Promise((resolve, reject) => {
        InAppPurchases.setPurchaseListener(async (result) => {
          switch (result.responseCode) {
            case IAPResponseCode.OK:
            case IAPResponseCode.DEFERRED:
              await onSuccess();
              await InAppPurchases.finishTransactionAsync(
                result.results![0],
                consumable
              );
              await InAppPurchases.disconnectAsync();
              return resolve(true);
            case IAPResponseCode.USER_CANCELED:
              await InAppPurchases.disconnectAsync();
              return resolve(false);
            case IAPResponseCode.ERROR:
              await InAppPurchases.disconnectAsync();
              return reject(new Error("IAP Error: " + result.errorCode));
          }
        });
      });
    } catch (e) {
      await InAppPurchases.disconnectAsync();
      throw e;
    }
  }

  buyPlayPass = () => MonetizationCtrl.buy("playpass", true, () => {});
  buyUpgrade = () =>
    MonetizationCtrl.buy("upgrade", false, () =>
      AsyncStorage.setItem(`hasUpgraded`, JSON.stringify(true))
    );
}
