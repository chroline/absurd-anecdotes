export default function validateFields(fields: string[]) {
  let errors = Array(fields.length).fill(false);

  fields.forEach((field, i) => {
    errors[i] = field === "";
  });

  return errors;
}
