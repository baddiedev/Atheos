//////////////////////////////////////////////////////////////////////////////80
// Analytics Init
//////////////////////////////////////////////////////////////////////////////80
// Copyright (c) Atheos & Liam Siira (Atheos.io), distributed as-is and without
// warranty under the MIT License. See [root]/LICENSE.md for more.
// This information must remain intact.
//////////////////////////////////////////////////////////////////////////////80
// Authors: Codiad Team, @Fluidbyte, Atheos Team, @hlsiira
//////////////////////////////////////////////////////////////////////////////80

(function(global) {
	'use strict';

	var atheos = global.atheos;

	var self = null;

	amplify.subscribe('system.loadExtra', () => atheos.analytics.init());

	atheos.analytics = {

		endpoint: null,
		local: null,

		//////////////////////////////////////////////////////////////////////80
		// Initilization
		//////////////////////////////////////////////////////////////////////80
		init: function() {
			self = this;

			echo({
				data: {
					target: 'analytics',
					action: 'init'
				},
				settled: function(status, reply) {
					if(status !== 'success') return;
					self.endpoint = reply.endpoint;
					self.send(reply.data);
				}
			});
		},

		//////////////////////////////////////////////////////////////////////80
		// Load Latest from the Repo
		//////////////////////////////////////////////////////////////////////80
		send(data) {
			echo({
				url: self.endpoint,
				data
			});
		}
	};

})(this);