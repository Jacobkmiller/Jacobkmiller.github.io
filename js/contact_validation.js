$(document).ready(function(){
  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
      preventSubmit: true,
      submitError: function($form, event, errors) {
          // additional error messages or events
      },
      submitSuccess: function($form, event) {
        $form.submit();
      },
      filter: function() {
          return $(this).is(":visible");
      },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
      e.preventDefault();
      $(this).tab("show");
  });
});
