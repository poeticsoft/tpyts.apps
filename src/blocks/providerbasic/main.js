const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { 
  InnerBlocks
} = wp.editor
const { 
  TextControl
} = wp.components

const edit = ({attributes, setAttributes}) => {

  return <div className="TPYTSBlock BlockProviderBasic">

    <div className="SectionTitle">
      { __('Datos', 'tpyts') }
    </div>

    <div className="Data">

      <div className="Group">  

        <div className="GroupTitle">
          { __('Administración', 'tpyts') }
        </div> 

        <div className="Field ProviderId G5">
          <TextControl
            label={ __('Identificador', 'tpyts')}
            value={ attributes.providerid }
            onChange={ value => setAttributes({
              ...attributes,
              providerid: value
            })}
          />
        </div> 
         
        <div className="Field IBAN G5">
          <TextControl
            label={ __('IBAN', 'tpyts')}
            value={ attributes.iban }
            onChange={ value => setAttributes({
              ...attributes,
              iban: value
            })}
          />
        </div>    
      </div>   
    </div>                                                           
  </div>
}

const save = ({ attributes }) => {

  return (
		<div className="BlockProviderBasic">
      <InnerBlocks.Content />
		</div>
	)
}

registerBlockType(
  'tpyts/providerbasic',
  {
    title: __('Provider Básico', 'tpyts'),
    icon: 'provider',
    category: 'tpyts',
    attributes: {
      providerid: {
        type: 'string'
      },
      iban: {
        type: 'string'
      }
    }, 
    edit: edit,
    save: save
  }
)