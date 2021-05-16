const handleDateFormat = (date) => {
  return Intl.DateTimeFormat('pt-BR').format(date);
}

export default handleDateFormat;