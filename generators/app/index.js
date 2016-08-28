'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
    prompting: function () {
        this.log(yosay(
            'Welcome to the glorious ' + chalk.red('generator-abstract') + ' generator!'
        ));

        var prompts = [
            {
                type: 'input',
                name: 'appName',
                message: 'What is your app going to be called?',
                default: this.appname
            },
            {
                type: 'input',
                name: 'appDescription',
                message: 'Description?',
                default: 'Some app'
            },
            {
                type: 'input',
                name: 'userName',
                message: 'The author\'s name? (for config files)',
                default: 'Cool man'
            }
        ];


        return this.prompt(prompts).then(function (props) {
            // function hasFeature(feat) {
            //     return props.features.indexOf(feat) !== -1;
            // }

            this.appName = props.appName;
            this.appDescription = props.appDescription;
            this.userName = props.userName;
        }.bind(this));
    },

    writing: function () {
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            {
                appName: this.appName,
                appDescription: this.appDescription,
                userName: this.userName
            }
        );
        this.fs.copyTpl(
            this.templatePath('_index.html'),
            this.destinationPath('index.html'),
            {
                appName: this.appName,
                appDescription: this.appDescription
            }
        );
        this.fs.copy(
            this.templatePath('_gulpfile.js'),
            this.destinationPath('gulpfile.js')
        );
        this.fs.copy(
            this.templatePath('_gitignore'),
            this.destinationPath('.gitignore')
        );
        this.fs.copy(
            this.templatePath('_favicon.ico'),
            this.destinationPath('favicon.ico')
        );
        this.fs.copy(
            this.templatePath('build/**/*.*'),
            this.destinationPath('build')
        );
        this.fs.copy(
            this.templatePath('src/**/*.*'),
            this.destinationPath('src')
        );
    },

    install: function () {
        this.installDependencies();
    },

    end: function () {
        this.log(chalk.cyan('Thank you for using our generator!\n Just run' + chalk.bgRed.bold('\'gulp\'') + 'command to start.'));
    }.bind(this)
});
