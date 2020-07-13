const Page = require( './Page' );

class LoginPage extends Page {
    constructor() {
        super();
        this.username = '#wpName1';
        this.password = '#wpPassword1';
        this.loginButton = '#wpLoginAttempt';
        this.userPage = '#pt-userpage';
    }

	async open( page ) {
		await this.openTitle( page, 'Special:UserLogin' );
	}

	async login( page, username, password ) {
        await this.open( page );
        await page.waitForSelector( this.username, {
            visible: true
        } );
        await page.type( this.username, username );
        await page.type( this.password, password );
		await page.click( this.loginButton );
	}

	async loginAdmin( page ) {
		await this.login( page, global.mwUser, global.mwPwd );
	}
}

module.exports = new LoginPage();
