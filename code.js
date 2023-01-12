const code = `
func square(Integer num) -> Integer {
    num * num
}

func sumOfSquares(Integer a, Integer b) -> Integer {
    square(a) + square(b)
}


proc alloc(Integer size) -> choice {
                                case ok(Address address) 
                                case outOfMemory
                            }

proc realloc(Address previousLocation, Integer newSize) -> | ok(Address address)
                                                           | outOfMemory

proc dealloc(Address location) -> ok or err(Trace trace)


proc createFile(String path) -> created(FileHandle handle) or failed

proc openFile(String path) -> opened(FileHandle handle) or fileNotFound

proc fileSize(FileHandle handle) -> Integer

proc readFile(FileHandle handle, Address address, Integer length) -> ok() or endOfFile(Integer bytesRead) or err(Trace trace)


proc readUserNameFromFile(String filePath) -> ok(named String userName) or err(Trace trace) {
    match openFile(filePath)
    case fileNotFound => Error.FileNotFound(filePath)
    case opened(FileHandle handle) => {
        let fileSize = fileSize(handle);
        let userName = makeString(fileSize);
        match readFile(handle, userName.address, fileSize)
        case err(Trace trace) => err(trace)
        case endOfFile(Integer bytesRead) => resizeString(userName, bytesRead)
        case ok => userName
    }
}
`