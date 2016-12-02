<ul width='100' s-b y='center'>
    <logo grow='1' text="{{header.logo.text.initial}}&nbsp;{{header.logo.text.text}}"></logo>

    <tab-links grow='{{header.tabs.length}}' tab-info="header.tabs"></tab-links>

    <li grow='1' p-y="10px">
        <button height="48px" f-s="18px" bg="white" border="3px solid #55A4B7" class="txt-azure">{{header.cta_button}}</button>
    </li>
    <li grow='0.2' x='end' padding-right='15px' pointer>
        <replace with="{{header.menu_url}}" width='48px' height='48px'></replace>
    </li>
</ul>
