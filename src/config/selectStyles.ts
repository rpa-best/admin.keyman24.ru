export const selectStyles = {
    valueContainer: (base: any, state: any) => ({
        ...base,
        background: state.isSelected ? 'red' : 'white',
        padding: '0px',
        margin: '0px',
    }),
    // input: (base: any, state: any) => ({
    //     ...base,
    //     // display: state.selectProps.menuIsOpen ? 'block' : 'none,',
    // }),
    multiValue: (base: any, state: any) => ({
        ...base,
        background: '#308D92',
        color: 'var(--text-color)',
        padding: '5px 8px',
        borderRadius: '12px',
        fontSize: '20px',
    }),
    control: (base: any, state: any) => ({
        ...base,
        borderColor: state.isSelected && 'var(--text-color)',
        padding: '10px 17px',
        borderRadius: '12px',
        minWidth: '350px',
    }),
    // noOptionsMessage: (base: any, state: any) => ({
    //     ...base,
    //     background: 'red',
    // }),
    // loadingMessage: (base: any, state: any) => ({
    //     ...base,
    //     background: '#fff',
    // }),
    menu: (base: any, state: any) => ({
        ...base,
        width: '100%',
    }),
    menuList: (base: any, state: any) => ({
        ...base,
        color: 'black',
        fontSize: '16px',
    }),
    indicatorsContainer: (base: any, state: any) => ({
        ...base,
        marginLeft: '15px',
    }),

    indicatorSeparator: (base: any, state: any) => ({
        ...base,
        display: 'none',
    }),

    dropdownIndicator: (base: any, state: any) => ({
        ...base,
        background: '#31d79b',
        marginLeft: '15px',
        borderRadius: '12px',
    }),
    option: (base: any, state: any) => ({
        ...base,
        padding: '10px 17px',
        background: state.isFocused ? '#31d79b' : '#fff',
    }),
}

export const themeUnset = (theme: any) => ({
    ...theme,
    colors: {
        // ...theme.colors
        primary: 'unset',
        primary25: 'unset',
        neutral0: '#fff', // menu background
        neutral20: 'unset',
        neutral50: 'black', // input text
        neutral80: 'black', // cursor
        primary75: 'unset',
        danger: 'unset',
        neutral5: 'unset',
        neutral30: 'unset',
        neutral60: 'unset',
        neutral90: 'unset',
        primary50: 'unset',
        dangerLight: 'unset',
        neutral10: 'unset',
        neutral40: 'unset',
        neutral70: 'unset',
    },
})

export default {
    selectStyles,
    themeUnset,
}
