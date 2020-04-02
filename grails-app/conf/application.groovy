

// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'trafficapp.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'trafficapp.UserRole'
grails.plugin.springsecurity.authority.className = 'trafficapp.Role'
grails.plugin.springsecurity.controllerAnnotations.staticRules = [
	[pattern: '/',               access: ['permitAll']],
	[pattern: '/error',          access: ['permitAll']],
	[pattern: '/**/index/**',       access: ['permitAll']],
	[pattern: '/**/index.gsp/**',   access: ['permitAll']],
	[pattern: '/shutdown',       access: ['permitAll']],
	[pattern: '/**/assets/**',      access: ['permitAll']],
	[pattern: '/**/js/**',       access: ['permitAll']],
	[pattern: '/**/css/**',      access: ['permitAll']],
	[pattern: '/**/images/**',   access: ['permitAll']],
	[pattern: '/**/favicon.ico', access: ['permitAll']],
	[pattern: '/**/home/**',     access: ['permitAll']],


	//for access to Link and Node tables
	[pattern: '/**/GameSettingsController/**',      access: ['permitAll']],
	[pattern: '/**/HomeController/**',       		access: ['permitAll']],
	[pattern: '/**/LinkController/**',        		access: ['permitAll']],
	[pattern: '/**/NodeController/**',       		access: ['permitAll']],
	[pattern: '/**/PostGameController/**',        	access: ['permitAll']],
	[pattern: '/**/ProfessorController/**',        	access: ['permitAll']],
	[pattern: '/**/StudentController/**',       	access: ['permitAll']],
	[pattern: '/**/StudentJoinController/**',       access: ['permitAll']],
	[pattern: '/**/StudentTurnController/**',       access: ['permitAll']],
	[pattern: '/**/statistics/**',        			access: ['permitAll']],

	//for access to domains
	[pattern: '/**/GameSettings/**',        		access: ['permitAll']],
	[pattern: '/**/Link/**',        				access: ['permitAll']],
	[pattern: '/**/Node/**',        				access: ['permitAll']],
	[pattern: '/**/StudentTurn/**',        			access: ['permitAll']],
	[pattern: '/**/postGame/**',        			access: ['permitAll']],



	//for admin access to dbconsole
	[pattern: '/**/dbconsole/**',   access: ['ROLE_ADMIN']],
]

grails.plugin.springsecurity.filterChain.chainMap = [
	[pattern: '/assets/**',      filters: 'none'],
	[pattern: '/**/js/**',       filters: 'none'],
	[pattern: '/**/css/**',      filters: 'none'],
	[pattern: '/**/images/**',   filters: 'none'],
	[pattern: '/**/favicon.ico', filters: 'none'],
	[pattern: '/**',             filters: 'JOINED_FILTERS']
]

environments {
	production {
		grails.dbconsole.enabled = true
		grails.dbconsole.urlRoot = '/dbconsole'
	}
}


