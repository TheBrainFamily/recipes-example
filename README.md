# Starting the app
Start the app by:
```npm start```

To run e2e tests app must be started locally on port 3000.

# Testing

In this app e2e tests are very helpful as they allow to extensively test the UI. With e2e tests we can also fully test the localStorage functionality in a real browser.

Open cypress tests by:
```npm run cypress:open```

Run cypress tests headlessly:
```npm run cypress```

Run jest unit tests:
```npm test```

# Developing the app
To develop the app with the help of automatically re-running e2e tests, start the app with:
```npm start```

Then start tests in the other console:
```npm run cypress:open```
In cypress window click on recipes.spec.js test. Now after any change in the code, the app will be re-tested in cypress.
