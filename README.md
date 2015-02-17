# xp-demo-module
Enonic XP Demo Module.

##Install Demo Module

This document will guide you through the installation of the demo module.

## Requirements

CAUTION: You need to have a running installation of Enonic XP - link:../installation/index.html[Install Enonic XP]

## Install via Admin Console

Sign into the admin console, and launch the 'Modules' App.

CAUTION: You will need a user with the "Administrator" role (system.admin).

Click `Install` in the toolbar, and enter the URI below.

 mvn:com.enonic.xp.modules/demo/1.0.0

Once the module is installed, it will appear in the list of modules. Select the module and start it from the menu.


## Install from command line

If you prefer the devop way, modules can also be installed from command line.

$XP_INSTALL is an alias for the directory where Enonic XP was installed
$XP_HOME is an alias for the Enonic XP home directory, default located in $XP_INSTALL/home

Download the module from the Enonic Repository

$ curl -O http://repo.enonic.com/public/com/enonic/xp/modules/demo/1.0.0/demo-1.0.0.jar

Then move the file into the $XP_HOME/deploy

If you have the modules application open, you will see that the module has been installed and started.


## Accessing the demo content

Upon installation, the module will automatically create a complete site with content - for your enjoyment this is a full copy of the Enonic.com website.

Go to the 'Content Manager' application to access and work with the site.
Enjoy!
