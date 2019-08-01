export function ChangeValue(self, propertyName, event) {
  if (event.target.type === "checkbox")
    self.setState({
      [propertyName]: event.target.checked
    });
  else
    self.setState({
      [propertyName]: event.target.value
    });
}
