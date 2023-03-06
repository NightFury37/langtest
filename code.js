const code = { "Tutorial1.def" : `interface myserver.Tutorial1;

func square(Integer num) -> Integer

func sumOfSquares(Integer first, Integer second) -> Integer

func factorial(Integer number, Integer soFar = 1) -> Integer

func fibonacci(Integer count, Integer a = 0, Integer b = 1) -> Integer`,

"Tutorial2.def" : `interface myserver.Tutorial2;

func compose<Type A, Type B, Type C>(func f(A a) -> B, func g(B b) -> C) -> func (A a) -> C

proc composeTest(String input) -> String

func areaOfCircle(Float radius) -> Float`,

"Tutorial3.def" : `interface myserver.Tutorial3;

proc alloc(Integer size) -> either ok:(Address address) or outOfMemory:

proc realloc(Address previousLocation, Integer newSize) -> either ok:(Address address) or outOfMemory:

proc dealloc(Address location) -> either ok: or err:(Trace trace)


proc createFile(String path) -> either created:(FileHandle handle) or failed:

proc openFile(String path) -> either opened:(FileHandle handle) or fileNotFound:

proc size(FileHandle handle) -> Integer

proc read(FileHandle handle, Address address, Integer length) -> either ok: or endOfFile:(Integer bytesRead) or err:(Trace trace)

proc readUserNameFromFile(String filePath) -> either ok: or endOfFile:(Integer bytesRead) or err:(Trace trace)`,

"readme.md" : `Hello doc`,

"Tutorial1.impl" : `module myserver.Tutorial1;

func square(Integer num) {
    return num * num
}

func sumOfSquares(Integer first, Integer second) {
    return square(num = first) + square(num = second)
}

func factorial(Integer number, Integer soFar = 1) {
    if number < 2
    then return soFar
    else goto factorial(number--, soFar *= number)
}

func fibonacci(Integer count, Integer a = 0, Integer b = 1) {
    if count < 1
    then return a
    else goto fibonacci(count--, a = b, b += a)
}`,

"Tutorial2.impl" : `module myserver.Tutorial2;

import libraryname.packagename1.packagename2.ModuleName1 {
    use functionName1 as name1;
    use functionName2 as name2;
    use procedureName3 as name3;
    use TypeName4 as Name4;
};
import libraryname.packagename3.ModuleName2;
import externallibraryname1.packagename4.ModuleName3;

func compose<Type A, Type B, Type C>(func f(A a) -> B, func g(B b) -> C) {
    return x => g(f(x))
}

proc composeTest(String input) {
    let hFun = compose(f = foo, g = bar);
    let message = {
        if hFun(input)
        then "Less than 5 characters"
        else "More than 4 characters"
    };
    return toUpperCase(message)

    where

    func foo(String s) {
        return length(s)
    }

    func bar(Integer i) {
        return i < 5
    }
}

func areaOfCircle(Float radius) {
    return pi * radius.raisedTo(2)

    where

    val pi = 3.1415926535897932384626

    func Float.raisedTo(Integer power, Float soFar = 1.0) {
        if power == 0
        then return soFar
        else goto this.raisedTo(power--, soFar *= this)
    }
}`,

"Tutorial3.impl" : `module myserver.Tutorial3;

proc readUserNameFromFile(String filePath) {
    match openFile(path = filePath)
    case fileNotFound: => goto err:(trace = createTrace(message = "File not found at : " + filePath))
    case opened:(FileHandle handle) => {
        let fileSize = size(handle);
        let name = createString(length = fileSize);
        match read(handle, address = name.address, length = fileSize)
        case err:(Trace trace) => goto err:(trace)
        case endOfFile:(Integer bytesRead) => goto ok:(userName = resize(string = name, newLength = bytesRead))
        case ok: => goto ok:(userName = name)
    }
}`,

"Tutorial1.test" : `test 1`,

"Tutorial2.test" : `test 2`,

"Tutorial3.test" : `test 3`,

"app.code" : `http.Server.create(request => http.Response.text("Hello World"));` };

let session = {
    tabs : [],
    tabIndex : {},
    selectedIndex : -1
};

let editor = null;