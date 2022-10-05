$(document).ready(function () {
  //Slick Slider
  $(".cards").slick({
    slidesToShow: 3,
    infinite: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 1,
          infinite: true,
        },
      },
    ],
  });

  // Máscara de telefone
  var SPMaskBehavior = function (val) {
      return val.replace(/\D/g, "").length === 11
        ? "(00) 00000-0000"
        : "(00) 0000-00009";
    },
    spOptions = {
      onKeyPress: function (val, e, field, options) {
        field.mask(SPMaskBehavior.apply({}, arguments), options);
      },
    };

  $("#phone").mask(SPMaskBehavior, spOptions);

  //Inserer UTM's e URL_Pagina automaticamente para
  const params = new URLSearchParams(window.location.search);
  $("form").append(
    $(
      `<input class="required" type="hidden" name="utm_medium" value="${params.get(
        "utm_medium"
      )}" />`
    )
  );
  $("form").append(
    $(
      `<input class="required" type="hidden" name="utm_source" value="${params.get(
        "utm_source"
      )}" />`
    )
  );
  $("form").append(
    $(
      `<input class="required" type="hidden" name="utm_campaign" value="${params.get(
        "utm_campaign"
      )}" />`
    )
  );
  $("form").append(
    $(
      `<input class="required" type="hidden" name="utm_term" value="${params.get(
        "utm_term"
      )}" />`
    )
  );
  $("form").append(
    $(
      `<input class="required" type="hidden" name="utm_content" value="${params.get(
        "utm_content"
      )}" />`
    )
  );
  $("form").append(
    $(
      `<input class="required" type="hidden" name="url_pagina" value="${location.href}" />`
    )
  );
});

//Ação quando submita o formulário
$("button#submit-button").on("click", function () {
  let formContainer = $(this).closest("form");
  let inputFields = $(formContainer).find("input.required");
  let selectFields = $(formContainer).find("select.required");

  if (validateEmptyFields(inputFields, selectFields))
    convertLeadRDStation(inputFields, selectFields);
});

function convertLeadRDStation(inputs, selects) {
  const dataLead = [];
  inputs.each((key, item) => {
    var valueField;
    // Se for Accept Legal convert o value para sim ou nao
    if ($(item).attr("type") === "checkbox" && $(item).val() === "on") {
      valueField = $(item).is(":checked") ? "Sim" : "Não";
    } else {
      valueField = $(item).val();
    }
    dataLead.push({ name: $(item).attr("name"), value: valueField });
  });

  selects.each((key, item) => {
    dataLead.push({ name: $(item).attr("name"), value: $(item).val() });
  });

  dataLead.push(
    { name: "token_rdstation", value: "2503d156edcdb35f3cbf32f2363d2db2" },
    {
      name: "identificador",
      value: "teste-ambiente-virtual-aprendizagem",
    }
  );

  RdIntegration.post(dataLead);

  window.location.href =
    "http://mobiliza.com.br/plataforma-lms-mobiliza/agradecimento-plataforma-lms-mobiliza.html";

  $("input").val("");
  $("select").val("");
}

// Força digitar apenas letras no campo nome
$("input[name=name]").keyup(function () {
  this.value = this.value.replace(
    /[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g,
    ""
  );
});

// Validação no formato de e-mail
function validacaoEmail(email) {
  var verifica =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return verifica.test(String(email).toLowerCase());
}

// Validação de e-mail corporativo
var invalidDomains = [
  "@gmail.",
  "@yahoo.",
  "@hotmail.",
  "@live.",
  "@aol.",
  "@outlook.",
  "@bol.",
  "@uol.",
  "@icloud.",
  "@ig.",
];

function emailCorporativo(email) {
  const emailNormalized = String(email).toLowerCase();
  for (var i = 0; i < invalidDomains.length; i++) {
    var domain = invalidDomains[i];
    if (emailNormalized.indexOf(domain) != -1) {
      return false;
    }
  }
  return true;
}

// Faz a validação dos campos vazios
function validateEmptyFields(inputs, selects) {
  let spanFields = $("form").find("span");
  // Reseta as mesagens
  spanFields.remove();

  // Verificar se os inputs estão vazios
  inputs.each((key, item) => {
    var valueField = $(item);

    // Verificação no input do tipo checkbox
    if (
      valueField.attr("type") === "checkbox" &&
      valueField.is(":checked") === false
    ) {
      $(valueField)
        .closest("label")
        .after(
          "<span class='error-negative-margin'>É necessário aceitar os termos.</span>"
        );
    }

    // Validação de e-mail
    if (valueField.attr("name") === "email") {
      if (valueField.val().length > 3 && !validacaoEmail(valueField.val()))
        $(valueField).after(
          "<span class='error'>Formato de e-mail inválido.</span>"
        );

      if (!emailCorporativo(valueField.val()))
        $(valueField).after(
          "<span class='error'>Utilize um e-mail corporativo.</span>"
        );
    }

    if (valueField.val().length === 0) {
      valueField.after(
        "<span class='error'>O campo não pode ser vazio.</span>"
      );
    }
  });

  // Verificar se os selects estão vazios
  selects.each((key, item) => {
    var valueField = $(item);

    if (valueField.val().length === 0) {
      valueField.after("<span class='error'>Selecione uma opção.</span>");
    }
  });

  inputEmptyFields = inputs.filter((key, el) => {
    return $(el).val().length === 0;
  });

  selectEmptyFields = selects.filter((key, el) => {
    return $(el).val().length === 0;
  });

  if (
    inputEmptyFields.length !== 0 ||
    selectEmptyFields.length !== 0 ||
    $("input[type=checkbox]:checked").length === 0 ||
    !validacaoEmail($("input[type=email]").val()) ||
    !emailCorporativo($("input[type=email]").val())
  ) {
    return false;
  } else {
    return true;
  }
}

//   Scroll To
function scrollToForm() {
  document.querySelector("#contact").scrollIntoView({
    behavior: "smooth",
  });
}

function openModal(data) {
  var formElement = $(".box-form");
  var bodyElement = $("body");
  var buttonMobile = $("#button-mobile");

  if (data) {
    formElement.addClass("open");
    bodyElement.append("<div class='opacity-bg'></div>");
    bodyElement.attr("style", "overflow: hidden;");
    buttonMobile.addClass("hide");
    document.querySelector("body").scrollIntoView({
      behavior: "smooth",
    });
  } else {
    formElement.removeClass("open");
    bodyElement.find(".opacity-bg").remove();
    bodyElement.attr("style", "overflow: auto;");
    buttonMobile.removeClass("hide");
    document.querySelector("body").scrollIntoView({
      behavior: "smooth",
    });
  }
}
