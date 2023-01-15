const code = `
func (of: Integer) -> Integer
square(of: num) = num * num

func (first: Integer, second: Integer) -> Integer
sumOfSquares(first, second) = square(first) + square(second)

func (index: Integer) -> Integer
fibonacci(index: count, hidden secondLast: a = 0, hidden last: b = 1) {
    match count < 2
    case true: => count
    case false: => fibonacci(index: count - 1, secondLast: b, last: a + b)
}


proc (size: Integer) -> either ok:(at: Address) or outOfMemory:
alloc(size) {
    // ...  code ...
    goto outOfMemory:
}

proc (old: Address, newSize: Integer) -> either ok:(at: Address) or outOfMemory:
realloc(old: previousLocation, newSize) {
    // ...  code ...
    goto outOfMemory:
}

proc (location: Address) -> either ok: or err:(trace: Trace)
dealloc(location) {
    // ...  code ...
    goto ok:
}


proc (path: String) -> either created:(handle: FileHandle) or failed:
createFile(path) {
    // ... code ...
    goto failed:
}

proc (path: String) -> either opened:(file: FileHandle) or fileNotFound:
openFile(path) {
    // ... code ...
    goto fileNotFound:
}

proc (file: FileHandle) -> Integer
size(file: handle) {
    // ... code ...
    0
}

proc (file: FileHandle, address: Address, length: Integer) -> either ok: or endOfFile:(bytesRead: Integer) or err:(trace: Trace)
read(file: handle, address, length) {
    // ... code ...
    goto ok:
}


proc (filePath: String) -> either ok:(userName: String) or err:(trace: Trace)
readUserNameFromFile(filePath) {
    match openFile(path: filePath)
    case fileNotFound: => goto err:(trace: createTrace(message: "File not found at : " + filePath))
    case opened:(file: handle) => {
        let fileSize = size(file: handle);
        let name = createString(length: fileSize);
        match read(file: handle, address: name.address, length: fileSize)
        case err:(trace) => goto err:(trace)
        case endOfFile:(bytesRead) => goto ok:(userName: resize(string: name, newLength: bytesRead))
        case ok: => goto ok:(userName: name)
    }
}
`