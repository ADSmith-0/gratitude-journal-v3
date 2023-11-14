class DateFormatter extends Date {
  toReadableDate() {
    return new Intl.DateTimeFormat("en-GB").format(this);
  }
}

export default DateFormatter;
