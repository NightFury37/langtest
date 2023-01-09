const code = `
Integer
func square(Integer num) {
    num * num
}

Integer
func sumOfSquares(Integer a, Integer b) {
    square(a) + square(b)
}


ok(Address address) or outOfMemory()
proc alloc(Integer size)

ok(Address address) or outOfMemory()
proc realloc(Address previousLocation, Integer newSize)

ok() or err(Trace trace)
proc dealloc(Address location)


created(FileHandle handle) or failed()
proc createFile(String path)

opened(FileHandle handle) or fileNotFound()
proc openFile(String path)

Integer
proc fileSize(FileHandle handle)

ok() or endOfFile(Integer bytesRead) or err(Trace trace)
proc readFile(FileHandle handle, Address address, Integer length)


ok(named String userName) or Error
proc readUserNameFromFile(String filePath) {
    match openFile(filePath)
    case notFound => Error.FileNotFound(filePath)
    case FileHandle handle => {
        let fileSize = fileSize(handle);
        let userName = makeString(fileSize);
        match readFile(handle, userName.address, fileSize)
        case fail(Error e) => e
        case endOfFile(Integer bytesRead) => resizeString(userName, bytesRead)
        case ok => userName
    }
}
`