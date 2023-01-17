const code = `
func square(Integer num) = num * num

func sumOfSquares(Integer first, Integer second) = square(first) + square(second)

func fibonacci(Integer count, Integer a = 0, Integer b = 1) {
    match count < 1
    case true: => return a
    case false: => goto fibonacci(count = count - 1, a = b, b = a + b)
}

func factorial(Integer number, Integer result = 1) {
    match number < 2
    case true: => return result
    case false: => goto factorial(number = number - 1, result = result * number)
}

func compose<Type A, Type B, Type C>(func f(A a) -> B, func g(B b) -> C) {
    return (A x) => g(f(x))
}

proc composeTest(String input) {
    let hFun = compose(foo, bar);
    let message = {
        match hFun(input)
        case true: => "Less than 5 characters"
        case false: => "More than 4 characters"
    }
    return toUpperCase(message)

    where

    func foo(String s) {
        return length(s)
    }

    func bar(Integer i) {
        return i < 5
    }
}


proc alloc(Integer size) -> either ok:(Address address) or outOfMemory:

proc realloc(Address previousLocation, Integer newSize) -> either ok:(Address address) or outOfMemory:

proc dealloc(Address location) -> either ok: or err:(Trace trace)


proc createFile(String path) -> either created:(FileHandle handle) or failed:

proc openFile(String path) -> either opened:(FileHandle handle) or fileNotFound:

proc size(FileHandle handle) -> Integer

proc read(FileHandle handle, Address address, Integer length) -> either ok: or endOfFile:(Integer bytesRead) or err:(Trace trace)


proc readUserNameFromFile(String filePath) {
    match openFile(path = filePath)
    case fileNotFound: => goto err:(trace = createTrace(message = "File not found at : " + filePath))
    case opened:(FileHandle handle) => {
        let fileSize = size(file = handle);
        let name = createString(length = fileSize);
        match read(file = handle, address = name.address, length = fileSize)
        case err:(Trace trace) => goto err:(trace)
        case endOfFile:(Integer bytesRead) => goto ok:(userName = resize(string = name, newLength = bytesRead))
        case ok: => goto ok:(userName = name)
    }
}
`