# Blueberry

Blueberry is an easy to use JavaScript framework for modern browsers
and also allows for easy devlopment alongside other JavaScript libraries
such as jQuery.

## Install

Blueberry can be installed using the following npm command:

```
npm install blueberryjs
```

Blueberry can also be cloned from the repo and then gulp(d) using `gulp build`.

## Usage

We can create a basic HTML file and load blueberry in it.
Then we load our blueberry component(s).
The div has two noticable attributes `blueberry` and `component`,
each can be used as is or can be used with the prefix `data-`.
Both work since Blueberry is smart enough to figure it out.

### **index.html**

```html
<html>
    <head>
        <title>My First Blueberry App</title>
        <script src="/path/to/blueberry.min.js"></script>
        <script src="/path/to/MyClickComponent.js"></script>
    </head>
    <body>
        <!-- Blueberry attribute:
            A blueberry attribute tells the JavaScript that
            "This is a blueberry object".
            The value is the name of the object
        -->
        <!-- Component attribute:
            A component attribute can have multiple components,
            they just need to be separated with a space.
            Components define in the DOM are automatically
            added to a blueberry object at load time.
        -->
        <div blueberry="My Object" component="myComponent">
            I am an awesome div!
        </div>
    </body>
</html>
```

A component is fairly easy to build, as it is just a simple class that extends
`BerryBehavior` which allows you to adds extra behaviors to your object.
The following component only uses a couple of the many `messages` that you
can add to your custom component.

### **MyClickComponent.js**

```js
// Creates a new component that can be resused
// on multiple Blueberry objects.
class MyClickComponent extends BerryBehavior {

    // This is a message that is sent from Blueberry
    // when a Blueberry object is created and it is only
    // called once per object per component.
    // We can not assume that all objects are active
    // at this point. This should be done using the
    // "start" message (see below). We can however,
    // save reference other attached componets on this object.
    awake(){
        alert('I am awake!');
    }

    // This is a message that is sent from Blueberry
    // when a Blueberry object is created and it is only
    // called once per object per component and after "awake"
    // Here we can assum that all objects are accessible
    // unlike "awake". Here we could find objects on the page
    // and save a reference to them.
    start(){
        alert('I have started!');
    }

    // This is a message that is sent from Blueberry
    // when it sees something has been clicked.
    // Any object with this component attached to it
    // will fire a click event when clicked.
    // If "click" was not defined, nothing would happen.
    click(){
        // Deletes the Object in 5 seconds
        berryObject.destroy(this.berryObject, 5);
    }

}

// Registers the component for usage.
// Components should only be registered one time on a page.
// As you can see "myComponent" matches the one in the HTML DOM
window.myComponent = MyClickComponent;
```