<script src="https://carrier.formcarry.com/js/v1.js"></script>
<script>
  formcarry({
    form: "G-4SQ70qhCMS",
    // id or the class name of the form element, only form element allowed
    // works with css selectors
    // # <= for id
    // . <= for class
    element: "#my-formcarry",
    extraData: {
      // add whatever you want
      screenSize: `${window.screen.width}x${window.screen.height}`,
      language: window.navigator.language,
    },
    // Success callback, you can show alert messages
    // or redirect the user in this function
    onSuccess: function(response){
      alert(response)
    },
    // Error callback, a good place to show errors 🗿
    onError: function(error){
      alert(error)
    }
  });
</script>