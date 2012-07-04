#PACS JAM
SHANON MARKETING PLATFORMのwebplugin用JavaScriptファイルです。

[Underscore.js](http://underscorejs.org/)に依存します。

# PACS CAL (pacscal.js)
カレンダープラグインです。

[FullCalendar](http://arshaw.com/fullcalendar/)に依存します。

## 利用方法
### 基本的な利用方法
基本的な利用方法は、

1. PacsCalのインスタンス作成(引数はPACSJAMのjsonオブジェクト)
2. カレンダーイベントの作成
3. 描画

という流れになります。

    var pc = new PacsCal(pacsjamJson);
    pc.eventMake();
    pc.render($('#calendar'));

### カレンダーイベントを変更する場合
描画されるカレンダーオブジェクトを変更する場合は、カレンダーイベント作成時にコールバック関数を利用して下さい。  

コールバックの引数には、PACSJAMインスタンスが渡されます。  
コールバック関数はカレンダーイベントオブジェクトを返して下さい。省略されたオブジェクトは標準のものが利用されます。

例) 描画されるテキストをTitleとSubTitleに変更する場合(標準はTitleのみ)

    var pc = new PacsCal(pacsjamJson);
    pc.eventMake(function(pj) {
        return {'title': pj.get('Title') + pj.get('SubTitle')};
    });
    pc.render($('#calendar'));

### 描画されるカレンダーオブジェクトを変更する場合。
特定のカレンダーオブジェクトのみを表示する場合は、rejectメソッドを利用して不要カレンダーオブジェクトを削除して下さい。
削除後にカレンダーイベントを作成して描画を行なって下さい。

rejectメソッドのコールバック関数に引き渡される引数はPCASJAMインスタンスです。  
コールバック関数はBoolean値を戻して下さい。(true値が返されたものを削除します。)

例) 特定のカテゴリーのみカレンダーに表示する場合

    var pc = new PacsCal(pacsjamJson);
    pc.reject(function(pj) {
        return (pj.get('SeminarCategory') !== '3');
    });
    pc.eventMake();
    pc.render($('#calendar'));


## カレンダー全体オプション
オプションとして指定できるのは以下です。  
オプションをデフォルトから変更する場合は、インスタンス作成時に第2引数で指定して下さい。

    var pc = new PacsCal(pacsjamJson, {....});

<table>
    <tr>
        <th>オプション名</th>
        <td>説明(デフォルト値)</td>
    </tr>
    <tr>
        <th>gcal</th>
        <td>googleカレンダーの休日を表示するかどうか(true)<br />falseにするとHTMLエスケープして描画</td>
    </tr>
    <tr>
        <th>html</th>
        <td>カレンダーイベントのtitleをhtml描画するか(true)</td>
    </tr>
    <tr>
        <th>status5</th>
        <td>キャンペーンステータスが5(準備中・終了)を描画するか(false)</td>
    </tr>
    <tr>
        <th>className</th>
        <td>描画されるカレンダーオブジェクトのクラス名(mp_cal)</td>
    </tr>
    <tr>
        <th>baseDmain</th>
        <td>カレンダーオブジェクトのリンクドメイン('')</td>
    </tr>
    <tr>
        <th>tooltip</th>
        <td>ツールチップ(マウスオーバー時のポップアップ)を利用するか(true)</td>
    </tr>
    <tr>
        <th>tooltipOpt</th>
        <td>ツールチップのオプション<br />
        'attrName': 詳細説明に利用する項目名(Detail)<br />
        'x': カーソルからポップアップ表示までのx軸距離(-100)<br />
        'y': カーソルからポップアップ表示までのy軸距離(50)
        </td>
    </tr>
</table>
