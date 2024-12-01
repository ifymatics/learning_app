

export function getCookie(name: string) {
    const dc = document.cookie;
    const prefix = name + "=";
    let end;
    let begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else {
        begin += 2;
        end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}

// function doSomething() {
//     var myCookie = getCookie("MyCookie");

//     if (myCookie == null) {
//         // do cookie doesn't exist stuff;
//     }
//     else {
//         // do cookie exists stuff
//     }
// }