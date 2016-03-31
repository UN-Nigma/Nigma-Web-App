
#Conventions
***
##Variables

###Type
* let: private variable in scope
* const: constant vatiable

Constant Variables:<br />
Use upper case
```javascript
const PI = 3.1416;  
const TITLE = "Nigma" 
```

General Variables:
Use camelCase
```javascript
let taskItemCounter = 0; // you can use 'var'  
let taskItemColor = "red" 
```

##Objects
<br />
Use PascalCase
```javascript
const User = {
    name: "jeison",
    money: 0,
    setMoney(money){
      this.money = "try again"  
    },
    otherMethod(){
        return null;
    }
}
```


##Methods
<br />
Use camelCase
```javascript
function getName() {
    //...
}

function getSecondName(arg1, arg2) {
    //...
}
```

##Components

```javascript
const Box = React.createClass({ //Name: PascalCase
    //order: 
    /**
     * LIFE CYCLE METHODS
     * ******************
     **/
     
     getInitalState(){
         //...
     }, 
     //...
     
     /**
      * EVENTS HANDLERS METHODS
      * ***********************
      **/
      
      _onChange(){
          //...
      },
      
      _onCreateItem(){
          //..
      },
      
      /**
       * RENDER METHOD
       * *************
       **/
       
       render() //...
       
})
```

### Best Practices 
* [Best conventions](https://web-design-weekly.com/2015/01/29/opinionated-guide-react-js-best-practices-conventions/)


##FLUX

* [Flux step by step] (http://blogs.atlassian.com/2014/08/flux-architecture-step-by-step/)
* [Draw] (https://drive.google.com/file/d/0B-seFT88djYhUXhuQmktWHVxOGc/view?usp=sharing)

