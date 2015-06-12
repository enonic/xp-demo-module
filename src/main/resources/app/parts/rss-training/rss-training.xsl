<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        xmlns:portal="urn:enonic:xp:portal:1.0"
        exclude-result-prefixes="portal">

    <xsl:output method="xhtml"/>

    <xsl:template match="/">
        <xsl:copy-of select="."/>
    </xsl:template>

</xsl:stylesheet>