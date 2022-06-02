import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';

const Form = ({ formik }) => {
  return (
    <Box maxWidth={'600px'} margin={'0 auto'}>
      <form onSubmit={formik.handleSubmit}>
        <Box maxWidth={'80%'} textAlign={'center'} margin={'0 auto'}>
          <FormControl>
            <FormLabel fontSize={'2xl'} textAlign={'center'}>
              Marka
            </FormLabel>
            <Input
              id="make"
              name="make"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.make}
              placeholder="Podaj markę"
            />
            {formik.touched.make && formik.errors.make ? (
              <Text color={'red'} textAlign={'center'}>
                {formik.errors.make}
              </Text>
            ) : null}
          </FormControl>
          <FormControl>
            <FormLabel fontSize={'2xl'} textAlign={'center'}>
              Model
            </FormLabel>
            <Input
              id="model"
              name="model"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.model}
              placeholder="Podaj model"
            />
            {formik.touched.model && formik.errors.model ? (
              <Text color={'red'} textAlign={'center'}>
                {formik.errors.model}
              </Text>
            ) : null}
          </FormControl>
          <FormControl>
            <FormLabel fontSize={'2xl'} textAlign={'center'}>
              Moc
            </FormLabel>
            <Input
              id="power"
              name="power"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.power}
              placeholder="Podaj moc"
            />
            {formik.touched.power && formik.errors.power ? (
              <Text color={'red'} textAlign={'center'}>
                {formik.errors.power}
              </Text>
            ) : null}
          </FormControl>
          <Box textAlign={'center'} mt={3}>
            <Button type={'submit'}>Wyślij</Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Form;
