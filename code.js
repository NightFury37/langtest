const code = `
func (of: Integer) -> Integer
square(of: num) = num * num

func (first: Integer, second: Integer) -> Integer
sumOfSquares(first, second) = square(first) + square(second)


proc (size: Integer) -> ok:(at: Address) or outOfMemory:
alloc(size) = {
    // ...  code ...
    goto outOfMemory:
}

proc (old: Address, newSize: Integer) -> ok:(at: Address) or outOfMemory:
realloc(old: previousLocation, newSize) = {
    // ...  code ...
    goto outOfMemory:
}

proc (location: Address) -> ok: or err:(trace: Trace)
dealloc(location) = {
    // ...  code ...
    goto ok:
}


proc (path: String) -> created:(handle: FileHandle) or failed:
createFile(path) = {
    // ... code ...
    goto failed:
}

proc (path: String) -> opened:(handle: FileHandle) or fileNotFound:
openFile(path) = {
    // ... code ...
    goto fileNotFound:
}

proc (handle: FileHandle) -> Integer
fileSize(handle) = {
    // ... code ...
    0
}

proc (handle: FileHandle, address: Address, length: Integer) -> ok: or endOfFile:(bytesRead: Integer) or err:(trace: Trace)
readFile(handle, address, length) = {
    // ... code ...
    goto ok:
}


proc (filePath: String) -> ok:(userName: String) or err:(trace: Trace)
readUserNameFromFile(filePath) = {
    match openFile(filePath)
    case fileNotFound: => goto err:(trace: createTrace("File not found at : " + filePath))
    case opened:(handle) => {
        let fileSize = fileSize(handle);
        let name = makeString(fileSize);
        match readFile(handle, name.address, fileSize)
        case err:(trace) => goto err:(trace)
        case endOfFile:(bytesRead) => goto ok:(userName: resizeString(name, bytesRead))
        case ok: => goto ok:(userName: name)
    }
}
`