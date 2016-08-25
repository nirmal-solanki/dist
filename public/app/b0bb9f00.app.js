"use strict";angular.module("medsmindApp",["ngCookies","ngResource","ngSanitize","ngAnimate","ngMessages","btford.socket-io","ui.router","ngMaterial","ngMdIcons","toastr"]).config(["$mdThemingProvider",function(a){a.theme("default").primaryPalette("blue").accentPalette("pink")}]).config(["$mdIconProvider",function(a){a.iconSet("action","../assets/iconsets/dcbd7e81.action-icons.svg",24).iconSet("alert","../assets/iconsets/dddd2f54.alert-icons.svg",24).iconSet("av","../assets/iconsets/5285e105.av-icons.svg",24).iconSet("communication","../assets/iconsets/58937c30.communication-icons.svg",24).iconSet("content","../assets/iconsets/10bb5352.content-icons.svg",24).iconSet("device","../assets/iconsets/0b1673a8.device-icons.svg",24).iconSet("editor","../assets/iconsets/e29866df.editor-icons.svg",24).iconSet("file","../assets/iconsets/cee39602.file-icons.svg",24).iconSet("hardware","../assets/iconsets/090dcd17.hardware-icons.svg",24).iconSet("icons","../assets/iconsets/icons-icons.svg",24).iconSet("image","../assets/iconsets/d6b3e4e5.image-icons.svg",24).iconSet("maps","../assets/iconsets/21332b75.maps-icons.svg",24).iconSet("navigation","../assets/iconsets/e258a7d3.navigation-icons.svg",24).iconSet("notification","../assets/iconsets/bf350e33.notification-icons.svg",24).iconSet("social","../assets/iconsets/06032043.social-icons.svg",24).iconSet("toggle","../assets/iconsets/65248262.toggle-icons.svg",24).iconSet("avatar","../assets/iconsets/1ea804f4.avatar-icons.svg",128)}]).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider",function(a,b,c,d){b.otherwise("/"),c.html5Mode(!0),d.interceptors.push("authInterceptor")}]).config(["toastrConfig",function(a){angular.extend(a,{allowHtml:!1,closeButton:!0,closeHtml:"<button>&times;</button>",extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},messageClass:"toast-message",onHidden:null,onShown:null,onTap:null,progressBar:!0,tapToDismiss:!0,templates:{toast:"directives/toast/toast.html",progressbar:"directives/progressbar/progressbar.html"},timeOut:5e3,titleClass:"toast-title",toastClass:"toast"})}]).factory("authInterceptor",["$rootScope","$q","$cookieStore","$location",function(a,b,c,d){return{request:function(a){return a.headers=a.headers||{},c.get("token")&&(a.headers.Authorization="Bearer "+c.get("token")),a},responseError:function(a){return 401===a.status?(d.path("/login"),c.remove("token"),b.reject(a)):b.reject(a)}}}]).run(["$rootScope","$location","Auth",function(a,b,c){a.$on("$stateChangeStart",function(a,d){c.isLoggedInAsync(function(c){d.authenticate&&!c&&(a.preventDefault(),b.path("/login"))})})}]),angular.module("medsmindApp").config(["$stateProvider",function(a){a.state("login",{url:"/login",templateUrl:"app/account/login/login.html",controller:"LoginCtrl"}).state("signup",{url:"/signup",templateUrl:"app/account/signup/signup.html",controller:"SignupCtrl"}).state("settings",{url:"/settings",templateUrl:"app/account/settings/settings.html",controller:"SettingsCtrl",authenticate:!0})}]),angular.module("medsmindApp").controller("LoginCtrl",["$scope","Auth","$location","$window",function(a,b,c,d){a.user={},a.errors={},a.login=function(d){a.submitted=!0,d.$valid&&b.login({email:a.user.email,password:a.user.password}).then(function(){c.path("/")})["catch"](function(b){a.errors.other=b.message})},a.loginOauth=function(a){d.location.href="google"===a?"/api/auth/"+a:"/auth/"+a}}]),angular.module("medsmindApp").controller("SettingsCtrl",["$scope","User","Auth","toastr",function(a,b,c,d){a.errors={},a.changePassword=function(b){a.submitted=!0,b.$valid&&c.changePassword(a.user.oldPassword,a.user.newPassword).then(function(){d.success("Password successfully changed.")})["catch"](function(){d.error("Incorrect password")})}}]),angular.module("medsmindApp").controller("SignupCtrl",["$scope","Auth","$location","$window",function(a,b,c,d){a.user={},a.errors={},a.register=function(d){a.submitted=!0,d.$valid&&b.createUser({name:a.user.name,email:a.user.email,password:a.user.password}).then(function(){c.path("/")})["catch"](function(b){b=b.data,a.errors={},angular.forEach(b.errors,function(b,c){d[c].$setValidity("mongoose",!1),a.errors[c]=b.message})})},a.loginOauth=function(a){d.location.href="google"===a?"/api/auth/"+a:"/auth/"+a}}]),angular.module("medsmindApp").controller("AdminCtrl",["$scope","$http","Auth","User",function(a,b,c,d){a.users=d.query(),a["delete"]=function(b){d.remove({id:b._id}),angular.forEach(a.users,function(c,d){c===b&&a.users.splice(d,1)})}}]),angular.module("medsmindApp").config(["$stateProvider",function(a){a.state("admin",{url:"/admin",templateUrl:"app/admin/admin.html",controller:"AdminCtrl"})}]),angular.module("medsmindApp").controller("DashboardCtrl",["$scope",function(a){a.message="Hello"}]),angular.module("medsmindApp").config(["$stateProvider",function(a){a.state("dashboard",{url:"/dashboard",templateUrl:"app/dashboard/dashboard.html",controller:"DashboardCtrl"})}]),angular.module("medsmindApp").controller("MainCtrl",["$scope","$http","socket",function(a,b,c){}]),angular.module("medsmindApp").config(["$stateProvider",function(a){a.state("main",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl"})}]),angular.module("medsmindApp").controller("MedicationsCtrl",["$scope",function(a){a.message="Hello"}]),angular.module("medsmindApp").config(["$stateProvider",function(a){a.state("medications",{url:"/medications",templateUrl:"app/medications/medications.html",controller:"MedicationsCtrl"})}]),angular.module("medsmindApp").controller("AddMedicineDialogController",["$scope","$mdDialog","MedicinesService",function(a,b,c){a.fnCloseDialog=function(){b.hide()},a.fnAddMedicine=function(a){c.addMedicines(a).then(function(){console.log("work"),b.hide()})}}]),angular.module("medsmindApp").controller("MedicinesCtrl",["$scope","$mdDialog","MedicinesService",function(a,b,c){a.message="Hello",a.fnShowAdvanced=function(a){b.show({controller:"AddMedicineDialogController",templateUrl:"app/medicines/dialog/addMedicine/addMedicine.html",parent:angular.element(document.body),targetEvent:a}).then(function(a){},function(){})};var d="img/list/60.jpeg";a.messages=[{face:d,what:"Brunch this weekend?",who:"Min Li Chan",when:"3:08PM",notes:" I'll be in your neighborhood doing errands"},{face:d,what:"Brunch this weekend?",who:"Min Li Chan",when:"3:08PM",notes:" I'll be in your neighborhood doing errands"},{face:d,what:"Brunch this weekend?",who:"Min Li Chan",when:"3:08PM",notes:" I'll be in your neighborhood doing errands"},{face:d,what:"Brunch this weekend?",who:"Min Li Chan",when:"3:08PM",notes:" I'll be in your neighborhood doing errands"},{face:d,what:"Brunch this weekend?",who:"Min Li Chan",when:"3:08PM",notes:" I'll be in your neighborhood doing errands"},{face:d,what:"Brunch this weekend?",who:"Min Li Chan",when:"3:08PM",notes:" I'll be in your neighborhood doing errands"},{face:d,what:"Brunch this weekend?",who:"Min Li Chan",when:"3:08PM",notes:" I'll be in your neighborhood doing errands"},{face:d,what:"Brunch this weekend?",who:"Min Li Chan",when:"3:08PM",notes:" I'll be in your neighborhood doing errands"},{face:d,what:"Brunch this weekend?",who:"Min Li Chan",when:"3:08PM",notes:" I'll be in your neighborhood doing errands"},{face:d,what:"Brunch this weekend?",who:"Min Li Chan",when:"3:08PM",notes:" I'll be in your neighborhood doing errands"},{face:d,what:"Brunch this weekend?",who:"Min Li Chan",when:"3:08PM",notes:" I'll be in your neighborhood doing errands"}],a.fnInit=function(){c.getMedicines().then(function(a){console.log(a)})}}]),angular.module("medsmindApp").config(["$stateProvider",function(a){a.state("medicines",{url:"/medicines",templateUrl:"app/medicines/medicines.html",controller:"MedicinesCtrl"})}]),angular.module("medsmindApp").factory("MedicinesService",["$http","$q",function(a,b){return{getMedicines:function(){var c=b.defer();return a.get("/api/medicines").then(function(a){c.resolve(a)},function(a){c.reject(a)}),c.promise},addMedicines:function(c){var d=b.defer();return a.post("/api/medicines",c).then(function(a){d.resolve(a)},function(a){d.reject(a)}),d.promise}}}]),angular.module("medsmindApp").factory("Auth",["$location","$rootScope","$http","User","$cookieStore","$q",function(a,b,c,d,e,f){var g={};return e.get("token")&&(g=d.get()),{login:function(a,b){var h=b||angular.noop,i=f.defer();return c.post("/auth/local",{email:a.email,password:a.password}).success(function(a){return e.put("token",a.token),g=d.get(),i.resolve(a),h()}).error(function(a){return this.logout(),i.reject(a),h(a)}.bind(this)),i.promise},logout:function(){e.remove("token"),g={}},createUser:function(a,b){var c=b||angular.noop;return d.save(a,function(b){return e.put("token",b.token),g=d.get(),c(a)},function(a){return this.logout(),c(a)}.bind(this)).$promise},changePassword:function(a,b,c){var e=c||angular.noop;return d.changePassword({id:g._id},{oldPassword:a,newPassword:b},function(a){return e(a)},function(a){return e(a)}).$promise},getCurrentUser:function(){return g},isLoggedIn:function(){return g.hasOwnProperty("role")},isLoggedInAsync:function(a){g.hasOwnProperty("$promise")?g.$promise.then(function(){a(!0)})["catch"](function(){a(!1)}):a(g.hasOwnProperty("role")?!0:!1)},isAdmin:function(){return"admin"===g.role},getToken:function(){return e.get("token")}}}]),angular.module("medsmindApp").factory("User",["$resource",function(a){return a("/api/users/:id/:controller",{id:"@_id"},{changePassword:{method:"PUT",params:{controller:"password"}},get:{method:"GET",params:{id:"me"}}})}]),angular.module("medsmindApp").directive("mongooseError",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){b.on("keydown",function(){return d.$setValidity("mongoose",!0)})}}}),angular.module("medsmindApp").controller("ShellCtrl",["$mdSidenav","$mdDialog","$scope","$location","Auth",function(a,b,c,d,e){c.isLoggedIn=e.isLoggedIn,c.isAdmin=e.isAdmin,c.getCurrentUser=e.getCurrentUser,c.logout=function(){e.logout(),d.path("/login")},c.isActive=function(a){return a===d.path()},c.toggleLeft=function(){a("left").toggle()};var f;c.openMenu=function(a,b){f=b,a(b)}}]),angular.module("medsmindApp").factory("socket",["socketFactory",function(a){var b=io("",{path:"/socket.io-client"}),c=a({ioSocket:b});return{socket:c,syncUpdates:function(a,b,d){d=d||angular.noop,c.on(a+":save",function(a){var c=_.find(b,{_id:a._id}),e=b.indexOf(c),f="created";c?(b.splice(e,1,a),f="updated"):b.push(a),d(f,a,b)}),c.on(a+":remove",function(a){var c="deleted";_.remove(b,{_id:a._id}),d(c,a,b)})},unsyncUpdates:function(a){c.removeAllListeners(a+":save"),c.removeAllListeners(a+":remove")}}}]),angular.module("medsmindApp").run(["$templateCache",function(a){a.put("app/account/login/login.html",'<div ng-include="\'components/shell/shell.html\'"></div><md-content class=md-padding><md-card class=login-card><md-card-content><h2 layout=row layout-align="center center">Login</h2><div layout=row layout-align="center center"><md-button class="md-fab md-mini md-warn" aria-label=Comment ng-click="loginOauth(\'google\')"><md-icon class="md-accent m-t-15" md-font-set="fa fa-lg fa-fw fa-google-plus"></md-icon></md-button></div><form name=form ng-submit=login(form) novalidate><md-input-container class="md-icon-float md-block"><label>Email</label><md-icon class=md-primary md-font-set="fa fa-lg fa-fw fa-envelope m-t-5"></md-icon><input required type=email name=email ng-model=user.email><div ng-messages=form.email.$error><div ng-message=required>This is required.</div></div></md-input-container><md-input-container class="md-icon-float md-block"><label>Password</label><md-icon class=md-primary md-font-set="fa fa-lg fa-fw fa-lock m-t-5"></md-icon><input required type=password name=password ng-model=user.password><div ng-messages=form.password.$error><div ng-message=required>This is required.</div></div></md-input-container><div layout=row><md-button class="md-raised md-primary" type=submit>Login</md-button><md-button ui-sref=signup>Register</md-button></div></form></md-card-content></md-card></md-content>'),a.put("app/account/settings/settings.html",'<div ng-include="\'components/shell/shell.html\'"></div><md-content class=md-padding><md-card class=login-card><md-card-content><h2 layout=row layout-align="center center">Change Password</h2><form name=changePasswordForm ng-submit=changePassword(changePasswordForm) novalidate><md-input-container class="md-icon-float md-block"><label>Old Password</label><md-icon class=md-primary md-font-set="fa fa-lg fa-fw fa-lock m-t-5"></md-icon><input type=password name=oldPassword ng-model=user.oldPassword required><div ng-messages=changePasswordForm.oldPassword.$error><div ng-message=required>This is required.</div></div></md-input-container><md-input-container class="md-icon-float md-block"><label>New Password</label><md-icon class=md-primary md-font-set="fa fa-lg fa-fw fa-lock m-t-5"></md-icon><input type=password name=newPassword class=form-control ng-model=user.newPassword ng-minlength=3 required><div ng-messages=changePasswordForm.newPassword.$error><div ng-message=required>This is required.</div></div></md-input-container><div layout=row><md-button class="md-raised md-primary" type=submit>Save changes</md-button></div></form></md-card-content></md-card></md-content><!--<div class="container">\n    <div class="row">\n        <div class="col-sm-12">\n            <h1>Change Password</h1>\n        </div>\n        <div class="col-sm-12">\n            <form class="form" name="form" ng-submit="changePassword(form)" novalidate>\n\n                <div class="form-group">\n                    <label>Current Password</label>\n\n                    <input type="password" name="password" class="form-control" ng-model="user.oldPassword"\n                           mongoose-error/>\n\n                    <p class="help-block" ng-show="form.password.$error.mongoose">\n                        {{ errors.other }}\n                    </p>\n                </div>\n\n                <div class="form-group">\n                    <label>New Password</label>\n\n                    <input type="password" name="newPassword" class="form-control" ng-model="user.newPassword"\n                           ng-minlength="3"\n                           required/>\n\n                    <p class="help-block"\n                       ng-show="(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || submitted)">\n                        Password must be at least 3 characters.\n                    </p>\n                </div>\n\n                <p class="help-block"> {{ message }} </p>\n\n                <button class="btn btn-lg btn-primary" type="submit">Save changes</button>\n            </form>\n        </div>\n    </div>\n</div>-->'),a.put("app/account/signup/signup.html",'<div ng-include="\'components/shell/shell.html\'"></div><md-content class=md-padding><md-card class=register-card><md-card-content><h2 layout=row layout-align="center center">Sign up</h2><div layout=row layout-align="center center"><md-button class="md-fab md-mini md-warn" aria-label=Comment ng-click="loginOauth(\'google\')"><md-icon class="md-accent m-t-15" md-font-set="fa fa-lg fa-fw fa-google-plus"></md-icon></md-button></div><form name=form ng-submit=register(form) novalidate><md-input-container class="md-icon-float md-block"><label>Name</label><md-icon class=md-primary md-font-set="fa fa-lg fa-fw fa-user m-t-5"></md-icon><input required name=name ng-model=user.name><div ng-messages=form.name.$error><div ng-message=required>This is required.</div></div></md-input-container><md-input-container class="md-icon-float md-block"><label>Email</label><md-icon class=md-primary md-font-set="fa fa-lg fa-fw fa-envelope m-t-5"></md-icon><input required name=email type=email ng-model=user.email><div ng-messages=form.email.$error><div ng-message=required>This is required.</div></div></md-input-container><md-input-container class="md-icon-float md-block"><label>Password</label><md-icon class=md-primary md-font-set="fa fa-lg fa-fw fa-lock m-t-5"></md-icon><input required type=password name=password ng-model=user.password><div ng-messages=form.password.$error><div ng-message=required>This is required.</div></div></md-input-container><div layout=row><md-button class="md-raised md-primary" type=submit>Sign up</md-button><md-button ui-sref=login>Login</md-button></div></form></md-card-content></md-card></md-content><!-- <div ng-include="\'components/navbar/navbar.html\'"></div>\n\n<div class="container">\n  <div class="row">\n    <div class="col-sm-12">\n      <h1>Sign up</h1>\n    </div>\n    <div class="col-sm-12">\n      <form class="form" name="form" ng-submit="register(form)" novalidate>\n\n        <div class="form-group" ng-class="{ \'has-success\': form.name.$valid && submitted,\n                                            \'has-error\': form.name.$invalid && submitted }">\n          <label>Name</label>\n\n          <input type="text" name="name" class="form-control" ng-model="user.name"\n                 required/>\n          <p class="help-block" ng-show="form.name.$error.required && submitted">\n            A name is required\n          </p>\n        </div>\n\n        <div class="form-group" ng-class="{ \'has-success\': form.email.$valid && submitted,\n                                            \'has-error\': form.email.$invalid && submitted }">\n          <label>Email</label>\n\n          <input type="email" name="email" class="form-control" ng-model="user.email"\n                 required\n                 mongoose-error/>\n          <p class="help-block" ng-show="form.email.$error.email && submitted">\n            Doesn\'t look like a valid email.\n          </p>\n          <p class="help-block" ng-show="form.email.$error.required && submitted">\n            What\'s your email address?\n          </p>\n          <p class="help-block" ng-show="form.email.$error.mongoose">\n            {{ errors.email }}\n          </p>\n        </div>\n\n        <div class="form-group" ng-class="{ \'has-success\': form.password.$valid && submitted,\n                                            \'has-error\': form.password.$invalid && submitted }">\n          <label>Password</label>\n\n          <input type="password" name="password" class="form-control" ng-model="user.password"\n                 ng-minlength="3"\n                 required\n                 mongoose-error/>\n          <p class="help-block"\n             ng-show="(form.password.$error.minlength || form.password.$error.required) && submitted">\n            Password must be at least 3 characters.\n          </p>\n          <p class="help-block" ng-show="form.password.$error.mongoose">\n            {{ errors.password }}\n          </p>\n        </div>\n\n        <div>\n          <button class="btn btn-inverse btn-lg btn-login" type="submit">\n            Sign up\n          </button>\n          <a class="btn btn-default btn-lg btn-register" href="/login">\n            Login\n          </a>\n        </div>\n\n        <hr>\n        <div>\n          <a class="btn btn-facebook" href="" ng-click="loginOauth(\'facebook\')">\n            <i class="fa fa-facebook"></i> Connect with Facebook\n          </a>\n          <a class="btn btn-google-plus" href="" ng-click="loginOauth(\'google\')">\n            <i class="fa fa-google-plus"></i> Connect with Google+\n          </a>\n          <a class="btn btn-twitter" href="" ng-click="loginOauth(\'twitter\')">\n            <i class="fa fa-twitter"></i> Connect with Twitter\n          </a>\n        </div>\n      </form>\n    </div>\n  </div>\n  <hr>\n</div> -->'),a.put("app/admin/admin.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div class=container><p>The delete user and user index api routes are restricted to users with the \'admin\' role.</p><ul class=list-group><li class=list-group-item ng-repeat="user in users"><strong>{{user.name}}</strong><br><span class=text-muted>{{user.email}}</span> <a ng-click=delete(user) class=trash><span class="glyphicon glyphicon-trash pull-right"></span></a></li></ul></div>'),a.put("app/dashboard/dashboard.html",'<div ng-include="\'components/shell/shell.html\'"></div><div layout=column ng-cloak><div layout=row layout-align="center center"><h1>Welcome to Medsmind</h1></div></div>'),a.put("app/main/main.html",'<div ng-include="\'components/shell/shell.html\'"></div><md-card><md-card-header><md-card-avatar><img src="https://cdn.vectorstock.com/i/composite/65,64/traditional-medicine-logo-vector-4286564.jpg"></md-card-avatar><md-card-header-text><span class=md-title>Medsmind</span> <span class=md-subhead>A drug or other preparation for the treatment or prevention of disease.</span></md-card-header-text></md-card-header><img ng-src=http://thcforptsd.com/wordpress/wp-content/uploads/2015/12/medical-hd-photo-1080p-hdwallwide.com_.jpg class=md-card-image alt="Washed Out"><md-card-title><md-card-title-text><span class=md-headline>Medsmind</span></md-card-title-text></md-card-title><md-card-content><p>The science or practice of the diagnosis, treatment, and prevention of disease (in technical use often taken to exclude surgery). A drug or other preparation for the treatment or prevention of disease.</p></md-card-content></md-card>'),a.put("app/medications/medications.html","<div ng-include=\"'components/shell/shell.html'\"></div><div layout=column ng-cloak></div>"),a.put("app/medicines/dialog/addMedicine/addMedicine.html",'<md-dialog aria-label="Mango (Fruit)" flex=60><form ng-cloak><md-toolbar><div class=md-toolbar-tools><h2>Add Medicine</h2><span flex></span><md-button class=md-icon-button ng-click=fnCloseDialog() aria-label=close><ng-md-icon icon=close></ng-md-icon></md-button></div></md-toolbar><md-dialog-content layout=column layout-padding><form name=projectForm><md-input-container class="md-block m-t-20"><label>Enter medicine name</label><input required name=name ng-model=medicine.name><div ng-messages=projectForm.description.$error><div ng-message=required>This is required.</div><div ng-message=md-maxlength>The name has to be less than 30 characters long.</div></div></md-input-container><md-input-container class=md-block><label>Description</label><textarea ng-model=medicine.info md-maxlength=200 rows=3 md-select-on-focus></textarea></md-input-container></form></md-dialog-content><md-dialog-actions layout=row><span flex></span><md-button class="md-raised md-primary" ng-click=fnAddMedicine(medicine)>Add</md-button></md-dialog-actions></form></md-dialog>'),a.put("app/medicines/medicines.html",'<div ng-include="\'components/shell/shell.html\'"></div><md-content ng-cloak><md-toolbar class=md-whiteframe-2dp style="background: #cdcdcd; color: #000"><div class=md-toolbar-tools><h2 ui-sref=main><a href=javascript:void(0);>Medicines</a></h2><span flex=""></span><md-button class="md-fab md-mini md-primary" aria-label=Favorite ng-click=fnShowAdvanced($event)><md-tooltip md-direction=left>Add Medicine</md-tooltip><md-icon md-font-set="fa fa-2x fa-plus"></md-icon></md-button></div></md-toolbar><div layout=column layout-fill><md-content style="height: 500px" md-theme=altTheme><section><md-subheader class=md-primary>Unread Messages</md-subheader><md-list layout-padding><md-list-item class=md-3-line ng-repeat="message in messages"><div class=md-list-item-text><h3>{{message.what}}</h3><h4>{{message.who}}</h4><p>{{message.notes}}</p></div></md-list-item></md-list></section><section><md-subheader class=md-warn>Late Messages</md-subheader><md-list layout=column layout-padding><md-list-item class=md-3-line ng-repeat="message in messages"><div class=md-list-item-text><h3>{{message.what}}</h3><h4>{{message.who}}</h4><p>{{message.notes}}</p></div></md-list-item></md-list></section><section><md-subheader>Read Messages</md-subheader><md-list layout=column layout-padding><md-list-item class=md-3-line ng-repeat="message in messages"><div class=md-list-item-text><h3>{{message.what}}</h3><h4>{{message.who}}</h4><p>{{message.notes}}</p></div></md-list-item></md-list></section><section><md-subheader class=md-accent>Archived messages</md-subheader><md-list layout=column layout-padding><md-list-item class=md-3-line ng-repeat="message in messages"><div class=md-list-item-text><h3>{{message.what}}</h3><h4>{{message.who}}</h4><p>{{message.notes}}</p></div></md-list-item></md-list></section></md-content></div></md-content>'),a.put("components/shell/shell.html",'<div ng-controller=ShellCtrl class=main-shell><md-sidenav class="md-sidenav-left md-whiteframe-2dp" md-component-id=left><md-toolbar class="md-tall md-accent"><div ng-if=isLoggedIn() layout=column layout-padding class=profile-container><div flex></div><div layout-padding layout=column><div class=profile-name>{{ getCurrentUser().name }}</div><div class=profile-email>{{ getCurrentUser().email }}</div></div></div></md-toolbar><md-content><md-list ng-cloak flex><md-list-item ui-sref=dashboard><ng-md-icon icon=dashboard size=20></ng-md-icon><p>Dashboard</p></md-list-item></md-list><md-divider></md-divider><md-list ng-cloak flex><md-list-item ui-sref=medicines><ng-md-icon icon=queue size=20></ng-md-icon><p>Medicines</p></md-list-item></md-list><md-divider></md-divider><md-list ng-cloak flex><md-list-item ui-sref=medications><ng-md-icon icon=note_add size=20></ng-md-icon><p>Medications</p></md-list-item></md-list></md-content></md-sidenav><md-toolbar class=md-whiteframe-2dp><div class=md-toolbar-tools><md-button ng-click=toggleLeft() class=md-icon-button aria-label=Settings ng-if=isLoggedIn()><md-icon md-svg-icon=assets/icons/fe6be280.menu.svg></md-icon></md-button><h2 ui-sref=main><a href=javascript:void(0);>Medsmind</a></h2><span flex=""></span><md-button ui-sref=login ng-hide=isLoggedIn()><md-icon md-font-set="fa fa-lg fa-fw fa-sign-in"></md-icon>Login</md-button><md-menu ng-if=isLoggedIn()><md-button aria-label="Open phone interactions menu" class=md-icon-button ng-click="openMenu($mdOpenMenu, $event)"><md-icon md-font-set="fa fa-lg fa-fw fa-ellipsis-v m-t-5"></md-icon></md-button><md-menu-content width=4><md-menu-item><md-button ui-sref=settings><md-icon md-font-set="fa fa-lg fa-fw fa-cog"></md-icon>Settings</md-button></md-menu-item><md-menu-divider></md-menu-divider><md-menu-item ng-show=isLoggedIn()><md-button ng-click=logout()><md-icon md-font-set="fa fa-lg fa-fw fa-sign-out"></md-icon>Logout</md-button></md-menu-item></md-menu-content></md-menu></div></md-toolbar></div>')}]);