export const required = (values) => {
    if (values)
        return undefined;
    return "Field is Requied"
}

export const maxFieldLength = (maxLength) => (value) => {
    if (value.length > maxLength)
        return `Max length is ${maxLength} symbols`
    return undefined;
}