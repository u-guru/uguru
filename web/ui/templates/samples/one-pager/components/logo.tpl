<li grow='2'>

    <div u-list="line_number in [0,1,2,3]">
        <span u-list="letter in 'gabrielle is a designer':trim({{line_number * 8}},{{(line_number + 1)*8}})" on-init="s:[start-anim:children]" u>
            <span u init-with='p:[opacity:0]' when-start-anim="a:[opacity:0:1:1000:easeOutCirc:{{index * 1000}}:0:1:f]">
            {{letter}}

            </span>

        </span>
    </div>
</li>