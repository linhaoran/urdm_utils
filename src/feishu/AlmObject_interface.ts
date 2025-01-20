// almList
/*
export interface Root {
    code: number
    payload: Payload
    iql: string
    updateDateTime: string
}

export interface Payload {
    count: number
    items: Item[]
}

export interface Item {
    id: string
    key: string
    name: string
    type: string
    section: string
    status: string
    workspace: string
    fzr: string[]
    sjxt: string | undefined[]
    sjxt2: any[]
    bgxt: string[]
    numFzr: number
    responsible: string[]
    numSjxt: number
    numSjxt2: number
    numBgxt: number
    singleSystem: boolean
    xqjl?: string
    User_dr?: string
    bbh?: string
    xfrq?: string
    cszxr?: string
    ywjl?: string
    sjsxsj?: string
    ces?: string
    Date_dr?: string
    jhbgrq?: string
    kfzgzl?: string
    fpr?: string
}
*/


// almList_Full
export interface Root {
    code: number
    payload: Payload
    iql: string
    updateDateTime: string
}

export interface Payload {
    count: number
    items: Item[]
}

export interface Item {
    dataQuotes: DataQuotes
    id: string
    key: string
    name: string
    itemType: ItemType
    workspace: Workspace
    createdBy: CreatedBy
    createdAt: string
    updatedBy: UpdatedBy
    updatedAt: string
    status: Status
    ancestors: any[]
    parentId: any
    objectId: string
    values: Values3
    rowId: string
}

export interface DataQuotes {
}

export interface ItemType {
    objectId: string
    key: string
    name: string
    icon: string
}

export interface Workspace {
    objectId: string
    key: string
    name: string
    isArchived: boolean
}

export interface CreatedBy {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled?: boolean
    deleted: boolean
    label: string
    values?: Values
}

export interface Values {
    "104"?: string
    "105"?: string
    "106"?: string
    "107"?: string
    "108"?: string
    "109"?: string
}

export interface UpdatedBy {
    objectId: string
    value: string
    username: string
    nickname?: string
    deleted: boolean
    label: string
    values?: Values2
    enabled?: boolean
}

export interface Values2 {
    "104"?: string
    "105"?: string
    "106"?: string
    "107"?: string
    "108"?: string
    "109"?: string
}

export interface Status {
    objectId: string
    name: string
    type: string
}

export interface Values3 {
    sequence: string
    root_leaf_field: RootLeafField
    root: any
    bbh?: string
    fpr?: Fpr[]
    "fpr-SortedUserField"?: string[]
    tcr?: Tcr[]
    "tcr-SortedUserField"?: string[]
    almh?: string
    bbdb?: string
    bgsj?: string
    cjrq?: number
    gzfl?: string[]
    jjcd?: string[]
    jsbs?: Jsb[]
    sjxt?: string[]
    tcbm?: string[]
    xqid?: string
    ywjl?: Ywjl[]
    "ywjl-SortedUserField"?: string[]
    cszxr?: Cszxr[]
    "cszxr-SortedUserField"?: string[]
    cwjhs?: string[]
    txxqk?: string
    yfjjy?: Yfjjy[]
    "yfjjy-SortedUserField"?: string[]
    ywzrr?: Ywzrr[]
    "ywzrr-SortedUserField"?: string[]
    bgjjcd?: string[]
    bscshj?: string[]
    cscxsj?: number
    csthcs?: number
    csthsj?: number
    dmjcqk?: string[]
    sfsjpl?: string[]
    sfsjzd?: string[]
    xxsjjs?: number
    xxsjks?: number
    yfcsqk?: string
    zrcsks?: number
    almType?: string
    content?: Content[]
    cszbjssj?: number
    sjxjzsxx?: Sjxjzsxx[]
    ywfwzdsj?: string
    cshjcyxfx?: string
    csztchixsj?: number
    RQ_VC_CHECKIN_DATE?: number
    UTS_VC_CHECKIN_USER_NAME?: UtsVcCheckinUserName[]
    "UTS_VC_CHECKIN_USER_NAME-SortedUserField"?: string[]
    r_item_group_auth_item_custom_field?: RItemGroupAuthItemCustomField[]
    ItemHandler: ItemHandler
    xfrq?: number
    xqjl?: Xqjl[]
    "xqjl-SortedUserField"?: string[]
    xqlx?: string[]
    ywfzmb?: string[]
    fxx?: string[]
    gzly?: string[]
    sfcsth?: string[]
    sfcszt?: string[]
    sjsxsj?: number
    xqxfjh?: number
    xtcssj?: number
    jhtjcssj?: number
    sfsjaqxq?: string[]
    sfxqfgncs?: string[]
    yfjjfzxxz?: string[]
    ces?: number
    wfsx?: string
    sfkfq?: string[]
    tjcssj?: number
    ywcsks?: number
    Date_dr?: number
    csjl_dr?: string
    zsccsjs?: number
    zsccssj?: number
    Dropdown1?: string[]
    gzjb?: string[]
    csfaps?: string[]
    xqfxjs?: number
    xqfxks?: number
    User_dr?: UserDr[]
    "User_dr-SortedUserField"?: string[]
    zsccszt?: string[]
    zsccssjjs?: number
    bglx?: string[]
    csfa?: Csfa[]
    tcfs?: string[]
    sfkht?: string[]
    aqcsjg?: string[]
    bgxtqk?: string[]
    jcfwbg?: string[]
    jhbgrq?: number
    kfltjs?: number
    kfltks?: number
    kfzgzl?: string
    yfjzjl?: Yfjzjl[]
    ywcsjs?: number
    xtcsjs1?: number
    xtcsks1?: number
    zsccsks?: number
    ztfafzr?: Ztfafzr[]
    "ztfafzr-SortedUserField"?: string[]
    sfxggglc?: string[]
    zsccssjks?: number
    sfhxhxxmxg?: string
    sfsjjkpzsh?: string[]
    lxzbks?: number
    lxzbwc?: number
    zrcsjs?: number
    sxhyzjg?: string[]
    sxhyzxq?: Sxhyzxq[]
    cszbkssj?: number
    sfszhtjxm?: string[]
    csztsj?: number
    jrjycsfhr?: Jrjycsfhr[]
    "jrjycsfhr-SortedUserField"?: string[]
    yjdwbgjzsj?: number
    sfcxdk?: string[]
    fgncsjg?: string[]
    sjl?: Sjl[]
    "sjl-SortedUserField"?: string[]
    finishAt?: number
    sfwhlwxt?: string
    xl?: string[]
    csgzl?: string
    bgwtsjxt?: string[]
    glsjdh?: string
    bgwtsjry?: Bgwtsjry[]
    "bgwtsjry-SortedUserField"?: string[]
    sfyqbgwt?: string[]
    bbgl?: string[]
    sfsjaqcs?: string[]
    wtgl?: string[]
    zgcs?: Zgc[]
    sxhsjyztgsj?: number
    bz?: string
    gbrq?: number
    bgsqr?: Bgsqr[]
    "bgsqr-SortedUserField"?: string[]
    Radio1?: string
    csjhrt?: number
    cstgrq?: number
    Dropdown6?: string[]
    sfsjjcfubg?: string[]
    ywcssjjssj?: number
    ywcssjkssj?: number
    inProgressAt?: number
    kfzgzlrt?: number
    thyy?: string
    csthqr?: string[]
    csthfhx?: string[]
    sfzjfwq?: string[]
    xtcssjkssj?: number
    File1?: File1[]
    oaqbh?: string
    YfjhGysjjs?: number
    YfjhGysjks?: number
    xtcssjjssj?: number
    csgzlrt?: number
    sjsxsjj?: number
    assignee?: Assignee[]
    "assignee-SortedUserField"?: string[]
    priority?: string
    fxdj?: string[]
    gjjd?: string[]
    xmfx?: string
    Text4?: string
    Text5?: string
    Text8?: string
    Text9?: string
    Text33?: string
    Text67?: string
    csywfz?: string[]
    Radio33?: string
    csgzlxq?: Csgzlxq[]
    "5ca04ee3-53d2-4e81-a557-d7f7314bcfc4"?: N5ca04ee353d24e81A557D7f7314bcfc42[]
    "7355e390-7f3a-4494-8d43-e8294e040a4d"?: number[]
    gjjdfzsj?: number
    sfjhbztc?: string
    xmsfyq?: string[]
    aqcsjggx?: number
    aqzrcsjg?: string[]
    csjhrt_1703661693821?: number
    xtcsjs_1703663260014?: number
    xtcsks_1703663255987?: number
    cszz?: Cszz[]
    "cszz-SortedUserField"?: string[]
    sfczfx?: string[]
    csgzlfpbl?: string
    sfsjjkdzsg?: string
    zrcs?: number
    gncszz?: Gncszz[]
    "gncszz-SortedUserField"?: string[]
    xmjhjs?: number
    xmjhqd?: number
    xtcsjs?: number
    xtcsks?: number
    zrcssjjssj?: number
    zrcssjkssj?: number
    csjhrt_1703661693821_1703666484939?: number
    xtcszt?: string[]
    zsccssjjs_1703661723918_1703663222395?: number
    zsccssjks_1703661709412_1703663227442?: number
    ywcsysd?: Ywcsysd[]
    File?: File[]
    sjcsts?: number
    watchers?: string[]
    zecsjd?: Zecsjd[]
    "a49fee82-99e9-4e3f-969d-34df04b05555"?: string[]
    "296b7259-9b30-4e02-b1ab-e3dc3a08e896"?: string
    "a953c6e7-54f6-48ae-b551-49938f0f2363"?: string
    "57e626dd-486d-4c80-ba2c-144167a171de"?: string
    "4e2627d4-a73d-4ffe-a061-f647f706f93d"?: string
    "817faf51-36e4-49bc-80d3-6381fd809cc0"?: string
    "61d566d4-857a-49e1-8a39-136426ff9a59"?: string
    zecsjd_1729064072268?: Zecsjd1729064072268[]
    zecsjd_1729064126717?: Zecsjd1729064126717[]
    zsccssjjs_1703661723918?: number
    zsccssjks_1703661709412?: number
    sjjxfj?: Sjjxfj[]
    xqjxfj?: Xqjxfj[]
    jzms?: string
    sxhjhyzrq?: number
    sfywcgzfx?: string[]
    r_scrum_rank?: string
    bqdf?: number
    bqjz?: Bqjz[]
    "d1348135-168b-4be5-826d-f6f239908b85"?: number[]
    "e9c0e245-2b30-4979-ac53-490a0b5086ca"?: number[]
    "4eadfc2d-9c85-4ba0-9119-0d05206a04d1"?: number[]
    sqjz?: Sqjz[]
    "cab0134f-9fcf-4bb8-891a-c628c2ca6c08"?: number[]
    "97c3d6da-9d0c-4e6c-9d87-ee6ab54f305b"?: number[]
    "a3cd6d90-b541-4315-ae51-578c66446e5e"?: number[]
    csdfsm?: string
    kfzgzlry?: number
    csyscsjldb?: string
    Number1: any
    glxmxq?: string
    sjzsgnrmswj?: Sjzsgnrmswj[]
    xmpc?: string
    csgzltj?: number
    hxjh?: string
    sfsjzbcg?: string[]
    sffbzt?: string
}

export interface RootLeafField {
    name: string
}

export interface Fpr {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled: boolean
    deleted: boolean
    label: string
    values?: Values4
}

export interface Values4 {
    "104"?: string
    "105"?: string
    "106"?: string
    "107"?: string
    "108"?: string
    "109"?: string
}

export interface Tcr {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled: boolean
    deleted: boolean
    label: string
    values?: Values5
}

export interface Values5 {
    "104"?: string
    "105"?: string
    "106"?: string
    "107"?: string
    "108"?: string
    "109"?: string
}

export interface Jsb {
    objectId: string
    value: string
    name: string
    label: string
}

export interface Ywjl {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled: boolean
    deleted: boolean
    label: string
    values?: Values6
}

export interface Values6 {
}

export interface Cszxr {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled: boolean
    deleted: boolean
    label: string
    values?: Values7
}

export interface Values7 {
    "104"?: string
    "105"?: string
    "106"?: string
    "107"?: string
    "108"?: string
    "109"?: string
}

export interface Yfjjy {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled?: boolean
    deleted: boolean
    label: string
    values?: Values8
}

export interface Values8 {
    "104"?: string
    "105"?: string
    "106"?: string
    "107"?: string
    "108"?: string
    "109"?: string
}

export interface Ywzrr {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled?: boolean
    deleted: boolean
    label: string
    values?: Values9
}

export interface Values9 {
    "104"?: string
    "105"?: string
    "106"?: string
    "107"?: string
    "108"?: string
    "109"?: string
}

export interface Content {
    id?: string
    type: string
    children: Children[]
    lineHeight?: string
    align?: string
}

export interface Children {
    text?: string
    color?: string
    fontSize?: string
    fontFamily?: string
    fontWeight?: string
    backgroundColor?: string
    bold?: boolean
    id?: string
    type?: string
    children?: Children2[]
}

export interface Children2 {
    id: string
    type: string
    children: Children3[]
    lineHeight: string
}

export interface Children3 {
    text: string
    backgroundColor: string
}

export interface Sjxjzsxx {
    type: string
    children: Children4[]
    id?: string
}

export interface Children4 {
    text?: string
    color?: string
    fontSize?: string
    fontFamily?: string
    fontWeight?: string
    id?: string
    type?: string
    children?: Children5[]
}

export interface Children5 {
    id: string
    type: string
    children: Children6[]
    attributes: Attributes
}

export interface Children6 {
    id: string
    type: string
    children: Children7[]
}

export interface Children7 {
    text: string
    italic?: boolean
}

export interface Attributes {
    colspan: string
    rowspan: string
}

export interface UtsVcCheckinUserName {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled: boolean
    deleted: boolean
    label: string
    values?: Values10
}

export interface Values10 {
    "104"?: string
    "105"?: string
    "106"?: string
    "107"?: string
    "108"?: string
    "109"?: string
}

export interface RItemGroupAuthItemCustomField {
    label: string
    value: string
}

export interface ItemHandler {
    users: User[]
    groups: Group[]
    workspaceRoles: WorkspaceRole[]
}

export interface User {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled?: boolean
    deleted: boolean
    label: string
}

export interface Group {
    objectId: string
    value: string
    name: string
    label: string
}

export interface WorkspaceRole {
    objectId: string
    value: string
    name: string
    label: string
}

export interface Xqjl {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled?: boolean
    deleted: boolean
    label: string
    values?: Values11
}

export interface Values11 {
    "104"?: string
    "105"?: string
    "106"?: string
    "107"?: string
    "108"?: string
    "109"?: string
}

export interface UserDr {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled: boolean
    deleted: boolean
    label: string
    values?: Values12
}

export interface Values12 {
    "104"?: string
    "105"?: string
    "106"?: string
    "107"?: string
    "108"?: string
    "109"?: string
}

export interface Csfa {
    md5?: string
    uid?: string
    href?: string
    name?: string
    status?: string
    linkProps?: LinkProps
    type?: string
    children?: Children8[]
    id?: string
    indent?: number
    listStyleType?: string
    lineHeight?: string
    textIndent?: number
    align?: string
}

export interface LinkProps {
    download: string
}

export interface Children8 {
    text?: string
    fontSize?: string
    fontFamily?: string
    bold?: boolean
    id?: string
    type?: string
    children?: Children9[]
    color?: string
}

export interface Children9 {
    id: string
    type: string
    children: Children10[]
}

export interface Children10 {
    id?: string
    type?: string
    children?: Children11[]
    indent?: number
    listStyleType?: string
    align?: string
    lineHeight?: string
    textIndent?: number
    text?: string
}

export interface Children11 {
    text: string
    fontSize?: string
    fontFamily?: string
    fontWeight?: string
    bold?: boolean
}

export interface Yfjzjl {
    type: string
    children: Children12[]
    id?: string
}

export interface Children12 {
    text: string
}

export interface Ztfafzr {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled: boolean
    deleted: boolean
    label: string
    values?: Values13
}

export interface Values13 {
    "104"?: string
    "105"?: string
    "106"?: string
    "107"?: string
    "108"?: string
    "109"?: string
}

export interface Sxhyzxq {
    type: string
    children: Children13[]
    id?: string
}

export interface Children13 {
    text: string
}

export interface Jrjycsfhr {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled: boolean
    deleted: boolean
    label: string
    values?: Values14
}

export interface Values14 {
    "104"?: string
    "105"?: string
    "106"?: string
    "107"?: string
    "108"?: string
    "109"?: string
}

export interface Sjl {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled: boolean
    deleted: boolean
    label: string
    values: Values15
}

export interface Values15 {
}

export interface Bgwtsjry {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled: boolean
    deleted: boolean
    label: string
    values: Values16
}

export interface Values16 {
    "104"?: string
    "105"?: string
    "106"?: string
    "107"?: string
    "108"?: string
    "109"?: string
}

export interface Zgc {
    id: string
    type: string
    children: Children14[]
}

export interface Children14 {
    text: string
}

export interface Bgsqr {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled: boolean
    deleted: boolean
    label: string
    values: Values17
}

export interface Values17 {
    "104"?: string
    "105"?: string
    "106"?: string
    "107"?: string
    "108"?: string
    "109"?: string
}

export interface File1 {
    md5: string
    uid: string
    href: string
    name: string
    status: string
    linkProps: LinkProps2
}

export interface LinkProps2 {
    download: string
}

export interface Assignee {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled: boolean
    deleted: boolean
    label: string
}

export interface Csgzlxq {
    recordId: number
    "5ca04ee3-53d2-4e81-a557-d7f7314bcfc4"?: N5ca04ee353d24e81A557D7f7314bcfc4
    "7355e390-7f3a-4494-8d43-e8294e040a4d"?: number
}

export interface N5ca04ee353d24e81A557D7f7314bcfc4 {
    label: string
    value: string
    deleted: boolean
    enabled: boolean
    nickname: string
    username: string
}

export interface N5ca04ee353d24e81A557D7f7314bcfc42 {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled: boolean
    deleted: boolean
    label: string
    values: Values18
}

export interface Values18 {
    "104"?: string
    "105"?: string
    "106"?: string
    "107"?: string
    "108"?: string
    "109"?: string
}

export interface Cszz {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled: boolean
    deleted: boolean
    label: string
    values: Values19
}

export interface Values19 {
}

export interface Gncszz {
    objectId: string
    value: string
    username: string
    nickname: string
    enabled: boolean
    deleted: boolean
    label: string
    values: Values20
}

export interface Values20 {
}

export interface Ywcsysd {
    md5: string
    uid: string
    href: string
    name: string
    status: string
    linkProps: LinkProps3
}

export interface LinkProps3 {
    download: string
}

export interface File {
    md5: string
    uid: string
    href: string
    name: string
    status: string
    linkProps: LinkProps4
}

export interface LinkProps4 {
    download: string
}

export interface Zecsjd {
    recordId: number
    "296b7259-9b30-4e02-b1ab-e3dc3a08e896"?: string
    "4e2627d4-a73d-4ffe-a061-f647f706f93d"?: string
    "57e626dd-486d-4c80-ba2c-144167a171de"?: string
    "61d566d4-857a-49e1-8a39-136426ff9a59"?: string
    "817faf51-36e4-49bc-80d3-6381fd809cc0"?: string
    "a49fee82-99e9-4e3f-969d-34df04b05555"?: string[]
    "a953c6e7-54f6-48ae-b551-49938f0f2363"?: string
}

export interface Zecsjd1729064072268 {
    recordId: number
    "296b7259-9b30-4e02-b1ab-e3dc3a08e896"?: string
    "4e2627d4-a73d-4ffe-a061-f647f706f93d"?: string
    "57e626dd-486d-4c80-ba2c-144167a171de"?: string
    "61d566d4-857a-49e1-8a39-136426ff9a59"?: string
    "817faf51-36e4-49bc-80d3-6381fd809cc0"?: string
    "a49fee82-99e9-4e3f-969d-34df04b05555"?: string[]
    "a953c6e7-54f6-48ae-b551-49938f0f2363"?: string
}

export interface Zecsjd1729064126717 {
    recordId: number
    "296b7259-9b30-4e02-b1ab-e3dc3a08e896"?: string
    "4e2627d4-a73d-4ffe-a061-f647f706f93d"?: string
    "57e626dd-486d-4c80-ba2c-144167a171de"?: string
    "817faf51-36e4-49bc-80d3-6381fd809cc0"?: string
    "a49fee82-99e9-4e3f-969d-34df04b05555"?: string[]
    "a953c6e7-54f6-48ae-b551-49938f0f2363"?: string
}

export interface Sjjxfj {
    md5: string
    uid: string
    href: string
    name: string
    status: string
    linkProps: LinkProps5
}

export interface LinkProps5 {
    download: string
}

export interface Xqjxfj {
    md5: string
    uid: string
    href: string
    name: string
    status: string
    linkProps: LinkProps6
    url?: string
}

export interface LinkProps6 {
    download: string
}

export interface Bqjz {
    recordId: number
    "3a5bb0b6-f81f-439e-b626-7eb90da24da3"?: number
    "4eadfc2d-9c85-4ba0-9119-0d05206a04d1"?: number
    "8acd9ad7-ae44-423c-b3e8-de4a38dc07a0"?: number
    "d1348135-168b-4be5-826d-f6f239908b85"?: number
    "e9c0e245-2b30-4979-ac53-490a0b5086ca"?: number
}

export interface Sqjz {
    recordId: number
    "4d2ebacf-1348-4c57-b73a-bfcd24c22c88"?: number
    "7ebf7741-a5e0-4dfc-ab95-c6d59301e0fe"?: number
    "97c3d6da-9d0c-4e6c-9d87-ee6ab54f305b"?: number
    "a3cd6d90-b541-4315-ae51-578c66446e5e"?: number
    "cab0134f-9fcf-4bb8-891a-c628c2ca6c08"?: number
}

export interface Sjzsgnrmswj {
    md5: string
    uid: string
    href: string
    name: string
    status: string
    linkProps: LinkProps7
}

export interface LinkProps7 {
    download: string
}
