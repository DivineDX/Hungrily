const test = (req, res) => {
    const tester = {
        name: "hello",
        thing: "world"
    }
    res.send(tester);
}

module.exports = {
    test: test
}