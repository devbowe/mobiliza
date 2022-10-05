jQuery(document).ready(function() {

   $('#telefone').mask('(00) 00000-0000');

  function validacaoEmail(email) {
      var verifica = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return verifica.test(String(email).toLowerCase());
	}

	var invalidDomains = ["@gmail.","@yahoo.","@hotmail.","@live.","@aol.","@outlook.","@bol.", "@uol."];

  function emailCorporativo(email) {
      for(var i=0; i < invalidDomains.length; i++) {
      var domain = invalidDomains[i];
      if (email.indexOf(domain) != -1) {
          return false;
          }
      }
      return true;
  }

	//formulario de contato
    $("#cadastrar").on('click',function (e) {
        e.preventDefault();

        var nome = $('#nome').val();
        var email = $('#email').val();
        var telefone = $('#telefone').val();
        var cargo = $('#cargo').val();
        var area = $('#area').val();
        var company = $('#company').val();
        var segmento = $('#segmento').val();
        var nro_colaboradores = $('#nro_colaboradores').val();
        var tempo_lms = $('#lms-tempo').val();
        var utm_source = $('#utm_source');
        var utm_medium = $('#utm_medium');
        var utm_campaign = $('#utm_campaign');
        var utm_content = $('#utm_content');
        var utm_term = $('#utm_term');
        var url_pagina = $('#url_pagina');  
        
        if(!nome){
          $('#nome').focus();
          Swal.fire({
            type: 'warning',
            text: 'Por favor, informe seu nome completo',
            timer: 5000
          });
      } 
      else if(!validacaoEmail(email) || emailCorporativo(email) == false){
        $('#email').focus();
        Swal.fire({
          type: 'warning',
          text: 'Por favor, informe seu e-mail corporativo',
          timer: 5000
        });
      } 
      else if (!telefone) {
        $('#telefone').focus();
        Swal.fire({
          type: 'warning',
          text: 'Por favor, informe seu celular corretamente',
          timer: 5000
        })
      } 
      else if (cargo == 'nulo') {
        $('#cargo').focus();
        Swal.fire({
          type: 'warning',
          text: 'Por favor, informe seu cargo',
          timer: 5000
        })
      } 
      else if (area == 'nulo') {
        $('#area').focus();
          Swal.fire({
            type: 'warning',
            text: 'Por favor, informe sua área',
            timer: 5000
        });
      } 
      else if (nro_colaboradores == 'nulo') {
        $('#nro_colaboradores').focus();
          Swal.fire({
            type: 'warning',
            text: 'Por favor, informe o número de colaboradores',
            timer: 5000
        });
      } 
      else if (segmento == 'nulo') {
          $('#segmento').focus();
            Swal.fire({
              type: 'warning',
              text: 'Por favor, informe seu segmento',
              timer: 5000
          });
      } 
      else if (tempo_lms == 'nulo') {
        $('#tempo_lms').focus();
        Swal.fire({
          type: 'warning',
          title: 'Falta pouco!',
          text: 'Por favor, informe há quanto tempo sua empresa possui um LMS',
          timer: 5000
        });
      } 
      else {
          var data_array = [
              { name: 'Nome', value: nome},
              { name: 'email', value: email},
              { name: 'Telefone', value: telefone},
              { name: 'Cargo', value: cargo},
              { name: '(Ativo) Área', value: area},
              { name: 'Empresa', value: company},
              { name: '(Ativo) Segmento', value: segmento},
              { name: '(Ativo) Nº de colaboradores 2021', value: nro_colaboradores},
              { name: 'lms-tempo', value: tempo_lms},        
              { name: 'utm_source', value: utm_source.val()},
              { name: 'utm_medium', value: utm_medium.val()},
              { name: 'utm_campaign', value: utm_campaign.val()},
              { name: 'utm_content', value: utm_content.val()},
              { name: 'utm_term', value: utm_term.val()},
              { name: 'url_pagina', value: url_pagina.val()},
              { name: 'aceitoulgpd', value: 'sim'},
              { name: 'Qualificação do Lead', value: 'Marketing Qualify'},

              { name: 'token_rdstation', value: '2503d156edcdb35f3cbf32f2363d2db2'},
              { name: 'identificador', value: 'plataforma-lms-mobiliza'}
          ];

          console.log(data_array);
          RdIntegration.post(data_array);

          /*$('input').val('');
          $('select').val('nulo');
          Swal.fire({
            type: 'success',
            title: 'Obrigada!',
            text: 'Em breve você será contatado por um de nossos consultores.',
            timer: 5000
          });*/
          setTimeout(function () {
            window.location.href = "./agradecimento-plataforma-lms-mobiliza.html";
          }, 1000);

        }
        return false;
    });
});
