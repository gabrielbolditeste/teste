
import { GraphQLError } from "graphql";

class ErroBase extends Error {
  static enviarResposta(message: string) {
    throw new GraphQLError(`${message}`, {
      extensions: {
        code: "ERRO...",
      },
    });
  }
}

export default ErroBase;