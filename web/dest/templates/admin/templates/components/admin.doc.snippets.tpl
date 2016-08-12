<div>
    <div class="component-item-nav">
        <ul class='full-y'>
            <li ng-click='doc.onSnippetClicked($index)' class='uppercase' ng-repeat='snippet in doc.snippets'><a ng-class="{'active': doc.snippetIndex === $index}">{{snippet.type}}</a></li>
        </ul>
    </div>
    <ng-transclude> </ng-transclude>
</div>