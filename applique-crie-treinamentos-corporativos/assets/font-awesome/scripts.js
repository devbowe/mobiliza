
jQuery(document).ready(function() {

   //formulario de contato
	$("#submit-form-rd").on('click',function (e) {
		e.preventDefault();

		var nome = $('#form-rd #nome').val();
		var email = $('#form-rd #email').val();
		var telefone = $('#form-rd #telefone').val();
		var produto = $('#form-rd #produto-interesse').val();
		var ocupacao = $('#form-rd #ocupacao').val();
		var assunto = $('#form-rd #assunto').val();

        var nomeResponse = 'Informe seu nome.';
        var emailResponse = 'Informe um e-mail válido.';
        var telefoneResponse = 'Informe um telefone válido.';
        var produtoResponse = 'Selecione um produto do seu interesse.';
        var assuntoResponse = 'Escolha um assunto.';
        var counterPhone = 14;


		if(!(nome)) {

			$('#form-rd #nome').focus();

			Swal({
			  type: 'warning',
			  text: nomeResponse,
			  timer: 5000
			});

		} else if(!validacaoEmail(email)){

			$('#form-rd #email').focus();

			Swal({
			  type: 'warning',
			  text: emailResponse,
			  timer: 5000
			});

		} else if (telefone.length < counterPhone) {

			$('#form-rd #telefone').focus();

			Swal({
			  type: 'warning',
			  text: telefoneResponse,
			  timer: 5000
			});

		} else if(produto == 'nulo') {

			$('#form-rd #produto-interesse').focus();

			Swal({
			  type: 'warning',
			  text: produtoResponse,
			  timer: 5000
			});

		} else if(assunto == 'nulo') {

			$('#form-rd #assunto').focus();

			Swal({
			  type: 'warning',
			  text: assuntoResponse,
			  timer: 5000
			});

		} else {

			var nome = $('#form-rd #nome').val();
			var email = $('#form-rd #email').val();
			var telefone = $('#form-rd #telefone').val();
			var produto = $('#form-rd #produto-interesse').val();
			var ocupacao = $('#form-rd #ocupacao').val();
			var assunto = $('#form-rd #assunto').val();
			var utm_source = $('#form-rd #utm_source').val();
			var utm_medium = $('#form-rd #utm_medium').val();
			var utm_campaign = $('#form-rd #utm_campaign').val();

			var data_array = [
				{ name: 'Nome', value: nome},
				{ name: 'email', value: email},
				{ name: 'Telefone', value: telefone},
				{ name: 'Produto de interesse', value: produto},
				{ name: 'Ocupação', value: ocupacao},
				{ name: 'Assunto', value: assunto},
				{ name: 'utm_source', value: utm_source},
				{ name: 'utm_medium', value: utm_medium},
				{ name: 'utm_campaign', value: utm_campaign},
				{ name: 'token_rdstation', value: 'b292aadf3096dbf27d6a2b89c7f6d4f6'},
				{ name: 'identificador', value: 'Regenlab | Contato'}
			];

			RdIntegration.post(data_array);

			$.ajax({
				method: 'post',
				url: postdata.ajax_url,
				dataType: 'JSON',
				contentType : 'application/x-www-form-urlencoded;charset=utf-8',
				data: {
				action: 'registralead',
					nome: nome,
					email: email,
					telefone: telefone,
					produto: produto,
					ocupacao: ocupacao,
					assunto: assunto
				},
				error: function(data) {
					//console.log(data);
				},
				success: function(data) {
					//console.log(data);
				}

			});

			$('#form-rd input').val('');

			$('.loader').fadeIn(300);

			setTimeout(function() {

				$('.loader').fadeOut(300);

					Swal({
					  type: 'success',
					  text: 'E-mail enviado com sucesso.',
					  timer: 5000
					});

			},1500);

		}

	});

    /*
        Máscaras
    */

   $('.form-cnpj').mask('00.000.000/0000-00', {reverse: true});
   $('.form-celular').mask('(00) 00000-0000');

   $('.btn-play-video').click(function() {
        $(this).hide();
        $('#video .thumb').hide();
        $('#video').append('<iframe width="808" height="455" src="https://www.youtube.com/embed/S3sJkP3q1h4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');

        return false;
    });
    
   /*
        Troca de ícone no acordeão
    */

     function toggleIcon(e) {
        $(e.target)
            .prev('.panel-heading')
            .find(".short-full")
            .toggleClass('glyphicon-triangle-right glyphicon-triangle-bottom');
    }
 
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);
    
    /*
        Formulário
    */
    $('.registration-form fieldset:first-child').fadeIn('slow');
    
    $('.registration-form input[type="text"], .registration-form input[type="password"], .registration-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    // Próximo passo
    $('.registration-form .btn-next').on('click', function() {
    	var parent_fieldset = $(this).parents('fieldset');
    	var next_step = true;
    	
    	parent_fieldset.find('input[type="text"], input[type="number"], input[type="password"], textarea').each(function() {
    		if( $(this).val() == "" ) {
    			$(this).addClass('input-error');
    			next_step = false;
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
    	
    	if( next_step ) {
    		parent_fieldset.fadeOut(400, function() {
	    		$(this).next().fadeIn();
	    	});
    	}
    	
    });
    
    // Passo anterior
    $('.registration-form .btn-previous').on('click', function() {
    	$(this).parents('fieldset').fadeOut(400, function() {
    		$(this).prev().fadeIn();
    	});
    });
    
    // Enviar
    $('.registration-form').on('submit', function(e) {
    	
    	$(this).find('input[type="text"], input[type="number"], input[type="password"], textarea').each(function() {
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
                e.preventDefault();
                $('#exampleModalCenter').modal('show');
    		}
    	});
    	
    });
    
    
});
