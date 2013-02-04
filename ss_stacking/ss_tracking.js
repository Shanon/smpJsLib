var target_urls = new Array(
    'https://event.analog.co.jp/public/'
    , 'http://www.analog.com/jp/content/'
);

var ad_code_param_name  = 'ss_ad_code';
var cookie_name         = 'ss_ad_code';
var discount_form_name  = 'use_discount_at_timetable';
// var vid_form_name      = 'user_info_visitor_data_id';
var used_code_form_name = 'code';
var formname            = 'Application';

// global method

function set_code() {
  debug("set_code start");
  var code = _get_ad_code();
  var used_code = document.getElementsByName(used_code_form_name)[0];
  debug("code : " + code);
  debug("used_code : " + used_code);
  if (code != undefined) {
    if (used_code && used_code.value != "") {

    } else {
      _save_ad_code(code);
      _add_parameter(ad_code_param_name, code);
      _make_hidden('code', code, formname);
      _make_hidden(discount_form_name, 1, formname);
    }
  }
}

function ss_tracking() {
  debug("ss_tracking start");
  var code = _get_ad_code();
  if (code != undefined) {
    _save_ad_code(code);
    _add_parameter(ad_code_param_name, code);
  }
}

function debug(msg) {
//  alert(msg);
}


// private method


function _getCookie(c_name) {
  if (document.cookie.length>0) {
    c_start=document.cookie.indexOf(c_name + "=");
    if (c_start!=-1) { 
      c_start=c_start + c_name.length+1; 
      c_end=document.cookie.indexOf(";",c_start);
      if (c_end==-1) c_end=document.cookie.length;
      return unescape(document.cookie.substring(c_start,c_end));
    } 
  }
  return "";
}


function _setCookie(c_name, value, expiredays) {
  var exdate=new Date();
  exdate.setDate(exdate.getDate()+expiredays);
  document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/";
}




function _getParameter(str) {
  var dec = decodeURIComponent;
  var par = new Array, itm;
  if(typeof(str) == 'undefined') return par;
  if(str.indexOf('?', 0) > -1) str = str.split('?')[1];
  str = str.split('&');
  for(var i = 0; str.length > i; i++){
    itm = str[i].split("=");
    if(itm[0] != ''){
      par[itm[0]] = typeof(itm[1]) == 'undefined' ? true : dec(itm[1]);
    }
  }
  return par;
}


function _save_ad_code(code) {
  if (code != undefined) {
    _setCookie(cookie_name, code, 1);
    debug("set ad code to cookie : " + code);
  }
}


function _get_ad_code() {
  var code;
  var ret = _getParameter(location.search);

  if (ret[ad_code_param_name] != undefined) {
    code = ret[ad_code_param_name];
  } else {
    code = _getCookie(cookie_name);
  }
  debug("get ad code : " + code);
  return code;
}


function _add_parameter(key, value) {
  debug("add parameter, key=" + key + ", value=" + value);
  for (u = 0; u < target_urls.length; u++) {
    var target_url = target_urls[u];

    if (target_url != undefined && key != undefined) {
      var aTag = document.getElementsByTagName("a");
      re = new RegExp("^" + target_url);
      for ( var i=0; i<aTag.length; i++ ) {

        if(aTag[i].href.match('#')) continue;

        if( aTag[i].href.match(re) ) {
          debug(aTag[i].href);
          if (aTag[i].href.match(/\?/)) {
            aTag[i].href = aTag[i].href + '&' + key + '=' + value;
          } else {
            aTag[i].href = aTag[i].href + '?' + key + '=' + value;
          }
          debug("add parameter : "+aTag[i].href);
        }
      }
      
      var areaTag = document.getElementsByTagName("area");
      for ( var i=0; i<areaTag.length; i++ ) {
        if( areaTag[i].href.match(target_url) ) {
          if (areaTag[i].href.match(/\?/)) {
            areaTag[i].href = areaTag[i].href + '&' + key + '=' + value;
          } else {
            areaTag[i].href = areaTag[i].href + '?' + key + '=' + value;
          }
          debug("add parameter : "+areaTag[i].href);
        }
      }
    }
  }
}


function _make_hidden( name, value, formname ){
  var q   = document.createElement('input');
  q.type  = 'hidden';
  q.name  = name;
  q.value = value;
  var form;
  if (formname){
    form = document.forms[formname];
  } else{ 
    form = document.forms[0]; 
  }
  if (form) {
    form.appendChild(q);
    debug("make hidden field. name=" + name + ", value=" + value);
  }
}

