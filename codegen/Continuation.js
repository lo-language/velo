/**
 * Created by spurcell on 5/1/16.
 */

// extends a JSConstruct

sm = function (target, args, onReply, onFail) {

    target(args);
    onReply();
};

foo = function () {
    console.log("i am foo");
};

sm(foo, [], cont, cont);

function cont () {

    console.log('in cont B');
    sm(foo, [], cont, cont);

    function cont() {
        console.log('in cont A');
    }
}