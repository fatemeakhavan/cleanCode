//**1**Don't add unneeded context
//If your class/object name tells you something, don't repeat that in your variable name
//Bad
const car = {
    carMake: "Honda",
    carModel: "Accord",
    carColor: "Blue"
  };
  
  function paintCar1(car, color) {
    car.carColor = color;
  }
  //Good
  const Car = {
    make: "Honda",
    model: "Accord",
    color: "Blue"
  };
  
  function paintCar2(car, color) {
    car.color = color;
  }


 //**2**Use default parameters instead of short circuiting or conditionals
 //bad 
 function createMicrobrewer(name) {
    const breweryName = name || "Hipster Brew Co.";
    // ...
 }
 
 //good
 function createMicrobrewery(name = "Hipster Brew Co.") {
    // ...
  }

//**3**Function arguments (2 or fewer ideally
//bad
function createMen(title, body, buttonText, cancellable) {
    // ...
  }
  
  createMen("Foo", "Bar", "Baz", true);
//good
function createMenu({ title, body, buttonText, cancellable }) {
    // ...
  }
  
  createMenu({
    title: "Foo",
    body: "Bar",
    buttonText: "Baz",
    cancellable: true
  });


//**4**Functions should do one thing
//bad
function emailClients(clients) {
    clients.forEach(client => {
      const clientRecord = database.lookup(client);
      if (clientRecord.isActive()) {
        email(client);
      }
    });
  }
//good
function emailActiveClients(clients) {
    clients.filter(isActiveClient).forEach(email);
  }
  
  function isActiveClient(client) {
    const clientRecord = database.lookup(client);
    return clientRecord.isActive();
  }


//**5**Don't use flags as function parameters
//bad 
function createFile1(name, temp) {
    if (temp) {
      fs.create(`./temp/${name}`);
    } else {
      fs.create(name);
    }
  }
//good
function createFile(name) {
    fs.create(name);
  }
  function createTempFile(name) {
    createFile(`./temp/${name}`);
  }


//**6**Avoid Side Effects 
//bad
const addItemToCart1 = (cart, item) => {
    cart.push({ item, date: Date.now() });
  };
//good
const addItemToCart = (cart, item) => {
    return [...cart, { item, date: Date.now() }];
  };


//**7**Encapsulate conditionals
//bad
if (fsm.state === "fetching" && isEmpty(listNode)) {
    // ...
  }
//good
function shouldShowSpinner(fsm, listNode) {
    return fsm.state === "fetching" && isEmpty(listNode);
  }
  
  if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
    // ...
  }


//**8**Avoid negative conditionals
//bad
function isDOMNodeNotPresent(node) {
    // ...
  }
  
  if (!isDOMNodeNotPresent(node)) {
    // ...
  }
//good
function isDOMNodePresent(node) {
    // ...
  }
  
  if (isDOMNodePresent(node)) {
    // ...
  }


//**9**Use method chaining
//bad
class Car {
    constructor(make, model, color) {
      this.make = make;
      this.model = model;
      this.color = color;
    }
  
    setMake(make) {
      this.make = make;
    }
  
    setModel(model) {
      this.model = model;
    }
  
    setColor(color) {
      this.color = color;
    }
  
    save() {
      console.log(this.make, this.model, this.color);
    }
  }
  
  const car = new Car("Ford", "F-150", "red");
  car.setColor("pink");
  car.save();

//good
class Car {
    constructor(make, model, color) {
      this.make = make;
      this.model = model;
      this.color = color;
    }
  
    setMake(make) {
      this.make = make;
      // NOTE: Returning this for chaining
      return this;
    }
  
    setModel(model) {
      this.model = model;
      // NOTE: Returning this for chaining
      return this;
    }
  
    setColor(color) {
      this.color = color;
      // NOTE: Returning this for chaining
      return this;
    }
  
    save() {
      console.log(this.make, this.model, this.color);
      // NOTE: Returning this for chaining
      return this;
    }
  }
  
  const car = new Car("Ford", "F-150", "red").setColor("pink").save();