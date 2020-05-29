const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { 
  InnerBlocks
} = wp.editor
const { 
  TextControl
} = wp.components

const edit = ({attributes, setAttributes}) => {

  return <div className="BlockStore">
    <div className="Data">
      <div className="Name">
        <TextControl
          label={ __('Nombre', 'tpyts')}
          value={ attributes.name }
          onChange={ value => setAttributes({
            ...attributes,
            name: value
          })}
        />
      </div>    
    </div>       
    <div className="Content">
      <InnerBlocks 
        templateLock={ false }
        allowedBlocks={[
          'core/paragraph',
          'core/image'
        ]}
      /> 
    </div>                                                                   
  </div>
}

const save = ({ attributes }) => {

  return (
		<div className="BlockStore">
      <div className="Data">        
        <div className="Name">{ attributes.name }</div>
      </div>
      <div className="Content">
        <InnerBlocks.Content />
      </div>
		</div>
	)
}

registerBlockType(
  'tpyts/store',
  {
    title: __('Store', 'tpyts'),
    icon: 'store',
    category: 'tpyts',
    attributes: {
      name: {
        type: 'string'
      }
    }, 
    edit: edit,
    save: save
  }
)