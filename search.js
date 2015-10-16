// Copyright 2006, Oakland Public Library
//
// http://oaklandlibrary.org/
//
// Portions of this script were adapted from the Capital Area District
// Library's OPAC, www.opac.cadl.org
//
// Permission is given for this code to be reused or modified by any library as
// long as credit is given and an e-mail is sent to oplweb@oaklandlibrary.org
// informing us of the URL of where this script is used.

function valueOf(myForm, dropdown){
	return myForm[dropdown].options[myForm[dropdown].selectedIndex].value;
}

function radioValueOf(form, id){
	for (i=0; i < form[id].length; i++){
		if (form[id][i].checked){
			if (form[id][i].value == "all")	return "&m=a&m=l&m=i&m=e&m=k&m=q";
			return "&m=" + form[id][i].value;
		}
	}
	return "none selected, this should never happen";
}

function checkBoxValueOf(form, id){
	ret="";
	for (i=0; i < form[id].length;i++){
		if (form[id][i].checked){
			ret += "&" + id + "=" + form[id][i].value;
		}
	}
	return ret;
}

function doSubmit(myForm){
	queryObj = new String();
	author = myForm["author"].value;
	title = myForm["title"].value;
	if (myForm["keyword"]) keyword = myForm["keyword"].value;
	else keyword = "";
	queryObj = "";

	if (author) {
	    queryObj += "a:(" + author + ")";
	}

	if (author && title) {
	    queryObj += " and ";
	}

	if (title) {
	    queryObj += "t:(" + title + ")";
	}

	if ((author || title) && keyword) {
	    queryObj = "(" + keyword + ")" + " and " + queryObj;
	} else if (keyword) {
		queryObj = keyword;
	}

	queryObj = escape(queryObj);
	i = queryObj.length;
	while (i >= 0) {
	    queryObj = queryObj.replace("/","%2f");
	    queryObj = queryObj.replace("+","%2b");
	    queryObj = queryObj.replace("$","%24");
	    queryObj = queryObj.replace("&","%26");
	    queryObj = queryObj.replace(",","%2c");
	    queryObj = queryObj.replace(":","%3a");
	    queryObj = queryObj.replace(";","%3b");
	    queryObj = queryObj.replace("=","%3d");
	    queryObj = queryObj.replace("?","%3f");
	    queryObj = queryObj.replace("@","%40");
	    i--;
	}

	queryObj += "&searchscope=" + valueOf(myForm, "searchscope");
	queryObj += "&Da=" + myForm["Da"].value + "&Db=" + myForm["Db"].value;

	if (myForm["searchpage"].value!="findmusic"){
		queryObj += "&l=" + valueOf(myForm, "l");
	}

	switch (myForm["searchpage"].value){
	case "findmagazines": queryObj += "&m=p"; break;
	case "findgames": queryObj += "&m=g"; break;
	default: queryObj += checkBoxValueOf(myForm, "m");
	}

	queryObj += "&SORT=" + valueOf(myForm, "SORT");
	url = "/";

	if (myForm[ "availlim" ].checked) {
		url += "availlim/";
	}
	url += "search/X?" + queryObj;
	location.href=url;
	return true;
}
