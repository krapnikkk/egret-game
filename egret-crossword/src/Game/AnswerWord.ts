class AnswerWord extends Word{
    public SelectWord:Word = null;

    public constructor(){
        super();
    }
    protected onclick_tap(){
        if(this.SelectWord != null){
            this.SelectWord.visible = true;//不可见
            this.SelectWord = null;
            this.setWordText("");
        }
    }
    //当一个问题字被选择添加到回答时候，设置不可见，并保存到本对象中以后使用
    public SetSelectWord(word:Word){
        if(word != null){//
            word.visible = false;
            this.setWordText(word.getWordText());
            this.SelectWord = null;
        }else{//问题字已经被添加过了
            this.setWordText("");
            this.SelectWord = null;
        }
        this.SelectWord = word;
    }
}