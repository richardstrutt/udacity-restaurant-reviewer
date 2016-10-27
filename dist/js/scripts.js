"use strict";function _defineProperty(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var angular,io,IDBStore;angular.module("reviewApp",[]).controller("MainCtrl",["$scope","orderByFilter",function(e,r){function t(e){e&&(m=e)}function n(e){console.log("Error: ",e)}function i(e){return!/[~`!#$%\^&*+=\-\[\]\\;\/{}|\\":<>\?]/g.test(e)&&e.length&&e}function a(e){var r=new Date(1e3*e),t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n=r.getFullYear(),i=t[r.getMonth()],a=r.getDate(),o=a+"/"+i+"/"+n;return o}var o,s=e,u=io.connect("http://localhost:3000/"),l=1,m={id:l,listing:[]};s.reviewed={comment:"",name:"",rating:""},s.gif=!1,s.list=!1,s.h2=!0;var g=new IDBStore({dbVersion:1,storeName:"review",keyPath:"id",autoIncrement:!0,onStoreReady:function(){g.get(l,t,n)}}),c=document.getElementById("search_1"),p=document.getElementById("search_2");s.search=function(){var e=i(c.value),r=i(p.value);e&&r&&(s.subPage.url="list.html",s.gif=!0,s.list=!1,s.h2=!1,u.emit("list",[e,r]))};var v=["9am","10am","11am","12am","1pm","2pm","3pm","4pm","5pm"],f=["9pm","10pm","11pm","12pm"];u.on("results",function(e){s.gif=!1,s.list=!0,o=e.businesses;for(var t=0;t<o.length;t++)o[t].hourOpen=v[Math.floor(Math.random()*v.length)],o[t].hourClose=f[Math.floor(Math.random()*f.length)];s.$apply(function(){s.lists=o,s.propertyName="age",s.reverse=!0,s.friends=r(o,s.propertyName,s.reverse)})}),u.on("error",function(){alert("Could not retrieve data")}),s.reviews=[],u.on("result",function(e){s.$apply(function(){var r=e.name;if(s.restaurant=r,e.review_count){var t={name:e.reviews[0].user.name,user_image:e.reviews[0].user.image_url,rating:""+e.reviews[0].rating,time:a(e.reviews[0].time_created),comment:e.snippet_text};s.reviews.push(t)}})}),s.action=function(e,r){s.subPage.url="listing.html",s.reviews=[],u.emit("listing",e);var t=m.listing.length;if(t)for(var n=0;n<t;n++){var i=m.listing[n][r];i&&s.reviews.push(i)}},s.sortBy=function(e){s.reverse=null!==e&&s.propertyName===e&&!s.reverse,s.propertyName=e,s.lists=r(o,s.propertyName,s.reverse)},s.addReview=function(e){var r=Date(),t=r.substring(8,10)+"/"+r.substring(4,7)+"/"+r.substring(11,15),n=_defineProperty({},e,{name:s.reviewed.name,user_image:"./imgs/profile-picture.svg",rating:s.reviewed.rating,time:t,comment:s.reviewed.comment});m.listing.push(n),s.reviews.push(n[e]),s.reviewed={comment:"",name:"",rating:""},g.put(m)}}]);