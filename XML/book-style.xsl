<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>

<xsl:template match="/">
  <html>
  <head>
    <title>Bookstore Catalog</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        padding: 40px 20px;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
      }
      h1 {
        text-align: center;
        color: white;
        font-size: 2.5em;
        margin-bottom: 30px;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      }
      .books-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 25px;
      }
      .book-card {
        background: white;
        border-radius: 15px;
        padding: 25px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .book-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0,0,0,0.3);
      }
      .category-badge {
        display: inline-block;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.75em;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 15px;
      }
      .category-cooking { background: #ff6b6b; color: white; }
      .category-children { background: #4ecdc4; color: white; }
      .category-web { background: #45b7d1; color: white; }
      .category-default { background: #95a5a6; color: white; }
      
      .book-title {
        font-size: 1.4em;
        color: #2c3e50;
        margin-bottom: 10px;
        font-weight: 600;
      }
      .book-author {
        color: #7f8c8d;
        margin-bottom: 5px;
        font-size: 0.95em;
      }
      .book-author::before {
        content: "✍ ";
      }
      .book-year {
        color: #95a5a6;
        font-size: 0.85em;
        margin-bottom: 15px;
      }
      .book-year::before {
        content: " ";
      }
      .book-price {
        font-size: 1.5em;
        color: #27ae60;
        font-weight: bold;
      }
      .book-price::before {
        content: "$";
      }
      .cover-badge {
        display: inline-block;
        background: #f39c12;
        color: white;
        padding: 3px 8px;
        border-radius: 5px;
        font-size: 0.7em;
        margin-left: 10px;
        text-transform: capitalize;
      }
      footer {
        text-align: center;
        color: rgba(255,255,255,0.8);
        margin-top: 40px;
        font-size: 0.9em;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1> Bookstore Catalog</h1>
      <div class="books-grid">
        <xsl:for-each select="bookstore/book">
          <div class="book-card">
            <xsl:choose>
              <xsl:when test="@category='cooking'">
                <span class="category-badge category-cooking"><xsl:value-of select="@category"/></span>
              </xsl:when>
              <xsl:when test="@category='children'">
                <span class="category-badge category-children"><xsl:value-of select="@category"/></span>
              </xsl:when>
              <xsl:when test="@category='web'">
                <span class="category-badge category-web"><xsl:value-of select="@category"/></span>
              </xsl:when>
              <xsl:otherwise>
                <span class="category-badge category-default"><xsl:value-of select="@category"/></span>
              </xsl:otherwise>
            </xsl:choose>
            <xsl:if test="@cover">
              <span class="cover-badge"><xsl:value-of select="@cover"/></span>
            </xsl:if>
            <h2 class="book-title"><xsl:value-of select="title"/></h2>
            <xsl:for-each select="author">
              <p class="book-author"><xsl:value-of select="."/></p>
            </xsl:for-each>
            <p class="book-year">Published: <xsl:value-of select="year"/></p>
            <p class="book-price"><xsl:value-of select="price"/></p>
          </div>
        </xsl:for-each>
      </div>
      <footer>
        <p>XML Bookstore Catalog - Styled with XSLT</p>
      </footer>
    </div>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>
