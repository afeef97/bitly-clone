function randomStringGenerator(stringLength) {
    const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charLength = chars.length;
    let result = "";
    for (let i = 0; i < stringLength; i++) {
        result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
}

export default randomStringGenerator;
