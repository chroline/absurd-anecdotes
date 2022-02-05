import FieldsScreenProps from "~modules/Fields/props";
import HomeScreenProps from "~modules/Home/props";
import StoryScreenProps from "~modules/Story/props";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: HomeScreenProps;
  Fields: FieldsScreenProps;
  Story: StoryScreenProps;
};
