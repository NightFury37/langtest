const code = `
func square(Integer num) = num * num

func sumOfSquares(Integer first, Integer second) = square(first) + square(second)

func fibonacci(Integer count, Integer a = 0, Integer b = 1) {
    match count < 1
    case true: => a
    case false: => goto fibonacci(count = count - 1, a = b, b = a + b)
}

func factorial(Integer number, Integer result = 1) {
    match number < 2
    case true: => result
    case false: => goto factorial(number = number - 1, result = result * number)
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
    case opened:(file = handle) => {
        let fileSize = size(file = handle);
        let name = createString(length = fileSize);
        match read(file = handle, address = name.address, length = fileSize)
        case err:(trace) => goto err:(trace)
        case endOfFile:(bytesRead) => goto ok:(userName = resize(string = name, newLength = bytesRead))
        case ok: => goto ok:(userName = name)
    }
}
`