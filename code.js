const code = `
func square(Integer num) -> Integer {
    return num * num
}

func sumOfSquares(Integer first, Integer second) -> Integer {
    return square(first) + square(second)
}

func fibonacci(Integer count, Integer a = 0, Integer b = 1) -> Integer {
    if count < 1
    then return a
    else goto fibonacci(count <- count - 1, a <- b, b <- a + b)
}

func factorial(Integer number, Integer soFar = 1) -> Integer {
    if number < 2
    then return soFar
    else goto factorial(number <- number - 1, soFar <- soFar * number)
}

func compose<Type A, Type B, Type C>(func f(A a) -> B, func g(B b) -> C) -> func (A a) -> C {
    return (A x) => g(f(x))
}

proc composeTest(String input) -> String {
    let hFun = compose(foo, bar);
    let message = {
        if hFun(input)
        then "Less than 5 characters"
        else "More than 4 characters"
    };
    return toUpperCase(message)

    where

    func foo(String s) -> Integer {
        return length(s)
    }

    func bar(Integer i) -> either true: or false: {
        return i < 5
    }
}

func areaOfCircle(Float radius) -> Float {
    return pi * radius.raisedTo(2)

    where

    val pi = 3.1415926535897932384626

    func Float.raisedTo(Integer power, Float soFar = 1.0) -> Float {
        if power == 0
        then return soFar
        else goto this.raisedTo(power <- power - 1, soFar <- soFar * this)
    }
}


proc alloc(Integer size) -> either ok:(Address address) or outOfMemory:

proc realloc(Address previousLocation, Integer newSize) -> either ok:(Address address) or outOfMemory:

proc dealloc(Address location) -> either ok: or err:(Trace trace)


proc createFile(String path) -> either created:(FileHandle handle) or failed:

proc openFile(String path) -> either opened:(FileHandle handle) or fileNotFound:

proc size(FileHandle handle) -> Integer

proc read(FileHandle handle, Address address, Integer length) -> either ok: or endOfFile:(Integer bytesRead) or err:(Trace trace)


proc readUserNameFromFile(String filePath) -> either ok: or endOfFile:(Integer bytesRead) or err:(Trace trace) {
    match openFile(path <- filePath)
    case fileNotFound: => goto err:(trace <- createTrace(message <- "File not found at : " + filePath))
    case opened:(FileHandle handle) => {
        let fileSize = size(file <- handle);
        let name = createString(length <- fileSize);
        match read(handle <- handle, address <- name.address, length <- fileSize)
        case err:(Trace trace) => goto err:(trace <- trace)
        case endOfFile:(Integer bytesRead) => goto ok:(userName <- resize(string <- name, newLength <- bytesRead))
        case ok: => goto ok:(userName <- name)
    }
}
`