import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import FroalaEditor from 'froala-editor';
import "froala-editor/css/third_party/embedly.min.css";
import "froala-editor/js/third_party/embedly.min.js";

@Component({
  selector: 'app-demo',
  template: `

    <div class="sample">
      <h2>Sample 2: Full Editor</h2>
      <div id="sample2" [froalaEditor] [(froalaModel)]="content" ></div>
    </div>
    
  `
})

export class AppComponent implements OnInit {

  ngOnInit () {
  
  Object.assign(FroalaEditor.POPUP_TEMPLATES, {
    "giphyPlugin.popup": '[_BUTTONS_][_CUSTOM_LAYER_]'
  });

  FroalaEditor.PLUGINS.giphyPlugin = function (editor) {
    function initPopup () {
	  // Popup buttons.
	  var popup_buttons = '';
	  // Create the list of buttons.
      // if (editor.opts.popupButtons.length > 1) {
        // popup_buttons += '<div class="fr-buttons">';
        // popup_buttons += editor.button.buildList(editor.opts.popupButtons);
        // popup_buttons += '</div>';
      // }
     // Load popup template.
      var template = {
        buttons: popup_buttons,
        custom_layer: '<div class="giphy_search"><div class="giphy_btn_container"><button class="giphy_gif_search_btn active" type="button">Gif</button><button class="giphy_sticker_search_btn" type="button">Sticker</button></div><input class="giphy_search_field" name="giphy_search" type="text" placeholder="Please type.."><div class="gifs_preview"></div></div>'
      };
	  // Create popup.
      var $popup = editor.popups.create('giphyPlugin.popup', template);
	  return $popup;
    }
	// Show the popup
	function showPopup () {
	  var $popup = editor.popups.get('giphyPlugin.popup');
	  if (!$popup) $popup = initPopup();
	  editor.popups.setContainer('giphyPlugin.popup', editor.$tb);
	  var $btn = editor.$tb.find('.fr-command[data-cmd="giphyIcon"]');
	  var left = $btn.offset().left + $btn.outerWidth() / 2;
      var top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);
	  editor.popups.show('giphyPlugin.popup', left, top, $btn.outerHeight());
	}	
    function hidePopup () {
      editor.popups.hide('giphyPlugin.popup');
    }
	return {
      showPopup: showPopup,
      hidePopup: hidePopup
    }
  }

    FroalaEditor.DefineIcon('giphyIcon', { SVG_KEY: 'help' });
    FroalaEditor.RegisterCommand('giphyIcon', {
      title: 'Giphy',
      icon: 'giphyIcon',
      undo: true,
      popup: true,
      plugin: 'giphyPlugin',
      showOnMobile: true,
      refreshAfterCallback: true,
      callback: function () {
        /* Toggle the giphy button */
        if (!this.popups.isVisible('giphyPlugin.popup')) {
          this.giphyPlugin.showPopup();
          this.$tb.find("input.giphy_search_field").focus()
          if (this.$tb.find("input.giphy_search_field").is(":focus")) { alert("hello")};
        } else {
          if (this.$el.find('.fr-marker')) {
            this.events.disableBlur();
            this.selection.restore();
          }
          this.popups.hide('giphyPlugin.popup');
        }
      },
    });

  (function (FroalaEditor) {
    FroalaEditor.DEFAULTS = Object.assign(FroalaEditor.DEFAULTS, {
    myOption: false
    });
    // I think you need to pass "editor" into the other function, then you have the instance where you can call methods etc
    FroalaEditor.PLUGINS.myPlugin = function (editor) {
      var private_var = 'giphyPlugin';
	    function _privateMethod () {
        console.log (private_var);
      }
	    function publicMethod () {
        console.log (_privateMethod());
      }
      // The start point for your plugin.
	    function _init () {	
	    // You can access any option from documentation or your custom options.
        console.log (editor.opts.myOption)
      }
	    // Expose public methods. If _init is not public then the plugin won't be initialized.
      // Public method can be accessed through the editor API like this
      // $('.selector').froalaEditor('myPlugin.publicMethod');
	    // Any code that is in that function will fire when adding this method
      return {
        _init: _init,
        publicMethod: publicMethod
      }
    }
  }) (FroalaEditor);

  }

  // Sample 2 model
  public content: string = '';
  public options: Object = {
    events: {
      "initialized": () => {
        console.log('initialized');
      },
      "contentChanged": () => {
        console.log("content changed");
      }
    },
    toolbarButtonsXS: {
		'moreText': {
			'buttons': ['bold', 'italic', 'underline', 'textColor', 'fontFamily', 'fontSize', 'backgroundColor', 'inlineStyle', 'strikeThrough', 'subscript', 'superscript', 'clearFormatting'],
			'buttonsVisible': 0
		},
	    'moreParagraph': {
			'buttons': ['paragraphStyle', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR'],
			'buttonsVisible': 0
		},
		'moreRich': {
			'buttons': ['insertLink', 'insertVideo', 'embedly', 'uploadPhotos', 'giphyIcon', 'atButton', 'emoticonsIcon', 'insertTable', 'html'],
			'buttonsVisible': 0
		},
		'moreMisc': {
			'buttons': ['undo', 'redo', 'selectAll', 'fullscreen'],
			'buttonsVisible': 0
		},
	  }
  };
 
}
