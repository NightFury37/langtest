const code = { "Tutorial1.def" : `interface myserver.Tutorial1;

func square(Integer num) -> Integer

func sumOfSquares(Integer first, Integer second) -> Integer

func factorial(Integer number) -> Integer

func fibonacci(Integer count) -> Integer`,

"Tutorial2.def" : `interface myserver.Tutorial2;

func compose<type A, type B, type C>(func f(A a) -> B, func g(B b) -> C) -> func (A a) -> C

proc composeTest(String input) -> String

func areaOfCircle(Float radius) -> Float`,

"Tutorial3.def" : `interface myserver.Tutorial3;

proc alloc(Integer size)                                      -> ok:(Address address) or outOfMemory:

proc realloc(Address previousLocation, Integer newSize)       -> ok:(Address address) or outOfMemory:

proc dealloc(Address location)                                -> ok: or err:(Trace trace)


proc createFile(String path)                                  -> created:(FileHandle handle) or failed:

proc openFile(String path, read: or write: or append:)        -> opened:(FileHandle handle) or fileNotFound:

proc size(FileHandle handle)                                  -> Integer

proc read(FileHandle handle, Address address, Integer length) -> ok: or endOfFile:(Integer bytesRead) or err:(Trace trace)

proc readUserNameFromFile(String filePath)                    -> ok: or endOfFile:(Integer bytesRead) or err:(Trace trace)`,

"readme.md" : `Hello doc`,

"ListOps.def" : `interface myserver.ListOps(type Elem, type List);

infix List list {

    func contains(Elem element)              -> true: or false:

    func get(Integer index)                  -> ok:(Elem element) or indexOutOfBounds:

    func set(Integer index, Elem newElement) -> ok:(List newList) or indexOutOfBounds:

    proc add(Elem newElement)                -> ok:(List newList) or memoryfull:

    proc remove(Integer index)               -> ok:(List newList) or indexOutOfBounds:

    func isEmpty()                           -> true: or false:

    func size()                              -> Integer
}`,

"ArrayListOps.def" : `interface myserver.ArrayListOps(type Elem);

type ArrayList

inherit ListOps(Elem, ArrayList)`,

"Ast.def" : `interface Ast;

type Symbol

type Expression

type ModuleDefinition`,

"readme.md" : `Hello doc`,

"Tutorial1.impl" : `module myserver.Tutorial1;

func square(Integer num) => num * num

func square(Integer num) {
    return num * num
}

func sumOfSquares(Integer first, Integer second) => square(num = first) + square(num = second)

func sumOfSquares(Integer first, Integer second) {
    return square(num = first) + square(num = second)
}

func max(Integer a, Integer b) {
    if a < b then return b
    else return a
}

// Unlabeled block expression
func factorial(Integer number) => call (number, result = 1) {
    if number < 2 then return result
    else continue (number--, answer *= number)
}

// Unlabeled block statement
func factorial(Integer number) {
    goto (number, result = 1) {
        if number < 2 then return result
        else continue (number--, answer *= number)
    }
}

// Labeled block expression
func factorial(Integer number) => call iter:(number, result = 1) {
    if number < 2 then return result
    else continue iter:(number--, answer *= number)
}

// Labeled block statement
func factorial(Integer number) {
    goto iter:(number, result = 1) {
        if number < 2 then return result
        else continue iter:(number--, answer *= number)
    }
}

// Unlabeled block expression
func fibonacci(Integer count) => call (count, a = 0, b = 1) {
    if count < 1 then return a
    else continue (count--, a = b, b += a)
}

// Unlabeled block statement
func fibonacci(Integer count) {
    goto (count, a = 0, b = 1) {
        if count < 1 then return a
        else continue (count--, a = b, b += a)
    }
}

// Labeled block expression
func fibonacci(Integer count) => call iter:(count, a = 0, b = 1) {
    if count < 1 then return a
    else continue iter:(count--, a = b, b += a)
}

// Labeled block statement
func fibonacci(Integer count) {
    goto iter:(count, a = 0, b = 1) {
        if count < 1 then return a
        else continue iter:(count--, a = b, b += a)
    }
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

func compose<type A, type B, type C>(func f(A a) -> B, func g(B b) -> C) {
    return x => g(f(x))
}

proc composeTest(String input) {
    let hFun = compose(f = foo, g = bar);
    let message = if hFun(input) then "Less than 5 characters" else "More than 4 characters";
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

    infix Float num {
        func raisedTo(Integer power) => call (power, result = 1) {
            if power == 0 then return result
            else continue (power--, soFar *= num)
        }
    }
}`,

"Tutorial3.impl" : `module myserver.Tutorial3;

proc openFile(String path, read:) {

}
proc openFile(String path, write:) {

}
proc openFile(String path, append:) {

}

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

"ListOps.impl" : `module myserver.ListOps(Type Elem, Type List);

infix List list {

    func contains(Elem element) => call (index = list.size()) {
        if index == -1 then goto false:
        if list.get(index) == element then goto true:
        else continue (index--)
    }

    func isEmpty() {
        return list.size() == 0
    }

}`,

"ArrayListOps.impl" : `module myserver.ArrayListOps(Type Elem);

type ArrayList = record {
    Elem[] array;
    Integer size;
    Integer capacity;
}

infix ArrayList list {

    func get(Integer index) {
        if index < 0 or index >= list.size then goto indexOutOfBounds:
        else goto ok:(list.array.get(index))
    }

    proc set(Integer index, Elem newElement) {
        if index < 0 or index >= list.size then goto indexOutOfBounds:
        else goto ok:(list.array.set(index, newElement))
    }

    proc add(Elem newElement) {
        if list.size < list.capacity then goto ok:(ArrayList(list.array.set(list.size, newElement), list.size + 1, list.capacity))
        else
        let newCapacity = list.capacity * 2;
        match alloc(newCapacity)
        case ok:(Address address) {
            let newArray = Array.copy(src = list.array, dest = Array(Elem, address), length = list.size);
            goto ok:(ArrayList(newArray.set(list.size, newElement), list.size + 1, newCapacity))
        }
        case outOfMemory: => goto memoryfull:
    }

    proc remove(Integer index) {
        if index < 0 or index >= list.size then goto indexOutOfBounds:
        else
        let newArray = Array.move(list.array, fromIndex = index + 1, toIndex = index, length = list.size - index - 1);
        goto ok:(ArrayList(newArray, list.size - 1, list.capacity))
    }

    func size() {
        return list.size
    }

}`,

"Ast.impl" : `module Ast;

type Symbol = record {
    u64 hashcode;
    u32 textOffset;
    u32 length;
}

type Expression = record {

}

type ModuleDefinition = record {
    Symbol name;
    ConstantDefinition[] constantMembers;
    RecordDefinition[] recordMembers;
    FunctionDefinition[] functionDefinitions;
    ProcedureDefinition[] procedureDefinitions;

    where

    type ConstantDefinition = record {
        Symbol name;
        Expression typeExpression;
        Expression valueExpression;
    }

    type RecordDefinition = record {
        Symbol name;
        Field[] fields;

        where

        type Field = record {
            Symbol name;
            Expression typeExpression;
        }
    }

    type FunctionDefinition = record {

    }

    type ProcedureDefinition = record {

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
