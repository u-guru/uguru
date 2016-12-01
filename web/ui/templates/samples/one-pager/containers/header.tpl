<div row x='center' y='center' width='100' height='10'>


    <ul width='100'  x='center' y='center' nowrap>

        <logo grow='1' text="{{header.logo.text.initial}}&nbsp;{{header.logo.text.text}}">
        </logo>


        <tab-links grow='{{header.tabs.length}}'  tab-info="header.tabs">
        </tab-links>

        <li grow='1' x='center' y-end row>
            <button f-s="18px" class='bg-white txt-azure border-3 border-azure'>
                {{header.cta_button}}
            </button>
        </li>


        <li grow='0.2'  x='end'  y='center' padding-right='20px' pointer>
            <replace with="{{header.menu_url}}" width='50px' height='50px'>
            </replace>
        </li>
    </ul>
</div>