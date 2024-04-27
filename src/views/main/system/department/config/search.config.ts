const searchConfig = {
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入查询的部门名称',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入查询的领导名称'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
    // {
    //   type: 'select',
    //   prop: 'selects',
    //   label: '部门',
    //   initialValue: '2',
    //   options: [
    //     {
    //       value: '1',
    //       label: '爱坤'
    //     },
    //     {
    //       value: '2',
    //       label: '九八佬'
    //     },
    //     {
    //       value: '3',
    //       label: '水深'
    //     }
    //   ]
    // }
  ]
}

export default searchConfig
